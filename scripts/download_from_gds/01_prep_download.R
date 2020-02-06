require(rock)
require(dplyr)
require(glue)

readr::read_csv("gds_paths.csv", col_names = c("volume", "file"), col_types = "cc") %>%
  dplyr::mutate(volume = paste0("gds://", volume),
                fullpath = paste0(volume, file),
                dirname = paste0("./results", dirname(file)),
                ftype = rock:::guess_file_type(fullpath),
                command = glue::glue("mkdir -p {dirname}; iap files download")) %>%
  dplyr::filter(ftype != "BAM") %>%
  dplyr::select(command, fullpath, dirname) %>%
  write.table("02_download.sh", row.names = F, col.names = F, quote = F)

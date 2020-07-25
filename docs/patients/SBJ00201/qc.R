require(tidyverse)
require(here)

fn <- list.files(c(here("nogit/benchmark_time/streamDefaultS3/"),
                   here("nogit/benchmark_time/streamDirectS3/")),
                 full.names = T, recursive = T, pattern = "time_metrics.csv")

read_metrics <- function(x) {
  sample <- sub("(.*).time_metrics.csv", "\\1", basename(x))
  mode <- dirname(x) %>% basename()
  readr::read_csv(x, col_names = c("x", "y", "name", "time_hrs", "time_sec"),
                  col_types = cols(.default = "c", time_sec = "d")) %>%
    dplyr::select(name, time_sec, time_hrs) %>%
    dplyr::mutate(name = sub("Time ", "", name),
                  time_sec = floor(time_sec),
                  time_hrs = sub("\\..*", "", time_hrs),
                  sample = sample,
                  mode = mode)
}

purrr::map(fn, read_metrics) %>%
  dplyr::bind_rows() %>%
  dplyr::filter(mode == "streamDefaultS3") %>%
  tidyr::pivot_wider(id_cols = name, names_from = c(sample), values_from = time_hrs)

purrr::map(fn, read_metrics) %>%
  dplyr::bind_rows() %>%
  dplyr::filter(mode != "streamDefaultS3") %>%
  tidyr::pivot_wider(id_cols = name, names_from = c(sample), values_from = time_hrs)


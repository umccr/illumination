require(tidyverse)
require(here)

fn <- list.files(here("nogit/SBJ00201"), full.names = T, recursive = T)
dn <- dirname(fn) %>% basename()

read_metrics <- function(x, d) {
  readr::read_csv(x, col_names = c("x", "y", "name", "time_hrs", "time_sec"),
                  col_types = cols(.default = "c", time_sec = "d")) %>%
    dplyr::select(name, time_sec, time_hrs) %>%
    dplyr::mutate(name = sub("Time ", "", name),
                  time_sec = floor(time_sec),
                  time_hrs = sub("\\..*", "", time_hrs),
                  run = d)
}

purrr::map2(fn, dn, read_metrics) %>%
  dplyr::bind_rows() %>%
  tidyr::pivot_wider(id_cols = name, names_from = run, values_from = time_hrs)


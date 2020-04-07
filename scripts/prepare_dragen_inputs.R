require(tidyverse)

#-------------- SEQCII --------------#
# FASTQ list
tribble(
  ~RGSM, ~Read1File, ~Read2File,
  "seqcii_N020", "/mount/fastqs/N_SRR7890889_1.fastq.gz", "/mount/fastqs/N_SRR7890889_2.fastq.gz",
  "seqcii_N050", "/mount/fastqs/N_SRR7890889_1.fastq.gz", "/mount/fastqs/N_SRR7890889_2.fastq.gz",
  "seqcii_N075", "/mount/fastqs/N_SRR7890889_1.fastq.gz", "/mount/fastqs/N_SRR7890889_2.fastq.gz",
  "seqcii_N100", "/mount/fastqs/N_SRR7890889_1.fastq.gz", "/mount/fastqs/N_SRR7890889_2.fastq.gz",
  "seqcii_T020", "/mount/fastqs/T_SRR7890902_20pc_1.fastq.gz", "/mount/fastqs/T_SRR7890902_20pc_2.fastq.gz",
  "seqcii_T050", "/mount/fastqs/T_SRR7890936_50pc_1.fastq.gz", "/mount/fastqs/T_SRR7890936_50pc_2.fastq.gz",
  "seqcii_T075", "/mount/fastqs/T_SRR7890895_75pc_1.fastq.gz", "/mount/fastqs/T_SRR7890895_75pc_2.fastq.gz",
  "seqcii_T100", "/mount/fastqs/T_SRR7890939_100pc_1.fastq.gz", "/mount/fastqs/T_SRR7890939_100pc_2.fastq.gz",
) %>%
  dplyr::mutate(RGID = RGSM, RGLB = "Unknown", Lane = "1") %>%
  dplyr::select(RGID, RGSM, RGLB, Lane, Read1File, Read2File) %>%
  readr::write_csv("seqcii_inputs.csv")

# tracking sheet
# Normals first, then all tumors.
pct <- c("020", "050", "075", "100")
b <- rep(paste0("seqcii_", pct), 2)
sn <- paste0("seqcii_", rep(c("N", "T"), each = 4), rep(pct, 2))

ts <- tibble(
  LibraryID = paste0("L", sn),
  "Sample_ID (SampleSheet)" = sn,
  SampleID = sn,
  SubjectID = paste0("SBJ_", b),
  Phenotype = rep(c("normal", "tumor"), each = 4)
)
writexl::write_xlsx(x = list(`2019` = ts), path = "seqcii_tracking_sheet.xlsx")


#-------- Elon et al. --------#
tribble(
  ~RGSM, ~RGID, ~Read1File, ~Read2File,
  "E190_T",  "E190_T", "180521_A00130_0060_AH5CHKDSXX_E190_PRJ180253_Missing_R1_001.fastq.gz", "180521_A00130_0060_AH5CHKDSXX_E190_PRJ180253_Missing_R2_001.fastq.gz",
  "E190_N",  "E190_N", "180521_A00130_0060_AH5CHKDSXX_E190_PRJ180254_Missing_R1_001.fastq.gz", "180521_A00130_0060_AH5CHKDSXX_E190_PRJ180254_Missing_R2_001.fastq.gz",
  "E194_T",  "E194_T", "180720_A00130_0070_AH5TY5DSXX_E194_PRJ180506_Missing_R1_001.fastq.gz", "180720_A00130_0070_AH5TY5DSXX_E194_PRJ180506_Missing_R2_001.fastq.gz",
  "E194_N",  "E194_N", "180720_A00130_0070_AH5TY5DSXX_E194_PRJ180507_Missing_R1_001.fastq.gz", "180720_A00130_0070_AH5TY5DSXX_E194_PRJ180507_Missing_R2_001.fastq.gz",
  "E199_N",  "E199_N", "180718_A00130_0068_BH5M73DSXX_E199_PRJ180495_Missing_R1_001.fastq.gz", "180718_A00130_0068_BH5M73DSXX_E199_PRJ180495_Missing_R2_001.fastq.gz",
  "E199_T",  "E199_T1", "180718_A00130_0068_BH5M73DSXX_E199_PRJ180494_Missing_R1_001.fastq.gz", "180718_A00130_0068_BH5M73DSXX_E199_PRJ180494_Missing_R2_001.fastq.gz",
  "E199_T",  "E199_T2", "181123_A00130_0082_BHCYL3DSXX_E199_PRJ180494_Missing_R1_001.fastq.gz", "181123_A00130_0082_BHCYL3DSXX_E199_PRJ180494_Missing_R2_001.fastq.gz",
  "E201_T",  "E201_T", "180718_A00130_0068_BH5M73DSXX_E201_PRJ180492_Missing_R1_001.fastq.gz", "180718_A00130_0068_BH5M73DSXX_E201_PRJ180492_Missing_R2_001.fastq.gz",
  "E201_N",  "E201_N", "180718_A00130_0068_BH5M73DSXX_E201_PRJ180493_Missing_R1_001.fastq.gz", "180718_A00130_0068_BH5M73DSXX_E201_PRJ180493_Missing_R2_001.fastq.gz",
  "E202_T",  "E202_T", "180720_A00130_0070_AH5TY5DSXX_E202_PRJ180499_Missing_R1_001.fastq.gz", "180720_A00130_0070_AH5TY5DSXX_E202_PRJ180499_Missing_R2_001.fastq.gz",
  "E202_N",  "E202_N", "180720_A00130_0070_AH5TY5DSXX_E202_PRJ180500_Missing_R1_001.fastq.gz", "180720_A00130_0070_AH5TY5DSXX_E202_PRJ180500_Missing_R2_001.fastq.gz",
  "E199_T1", "E199_T1", "180718_A00130_0068_BH5M73DSXX_E199_PRJ180494_Missing_R1_001.fastq.gz", "180718_A00130_0068_BH5M73DSXX_E199_PRJ180494_Missing_R2_001.fastq.gz",
  "E199_T2", "E199_T2", "181123_A00130_0082_BHCYL3DSXX_E199_PRJ180494_Missing_R1_001.fastq.gz", "181123_A00130_0082_BHCYL3DSXX_E199_PRJ180494_Missing_R2_001.fastq.gz",
) %>%
  dplyr::mutate(RGLB = "Unknown", Lane = "1",
                Read1File = paste0("/mount/fastqs/", Read1File),
                Read2File = paste0("/mount/fastqs/", Read2File)
                ) %>%
  dplyr::select(RGID, RGSM, RGLB, Lane, Read1File, Read2File) %>%
  readr::write_csv("elon_inputs.csv")

#-------- SBJ00306 --------#
tribble(
  ~RGSM, ~RGID, ~Read1File, ~Read2File,
  "SBJ00306_T",  "SBJ00306_T", "200402_A01052_0008_BH5LWFDSXY_SBJ00306_MDX200052_L2000165_R1_001.fastq.gz", "200402_A01052_0008_BH5LWFDSXY_SBJ00306_MDX200052_L2000165_R2_001.fastq.gz",
  "SBJ00306_N",  "SBJ00306_N", "200402_A01052_0008_BH5LWFDSXY_SBJ00306_MDX200051_L2000164_R1_001.fastq.gz", "200402_A01052_0008_BH5LWFDSXY_SBJ00306_MDX200051_L2000164_R2_001.fastq.gz"
) %>%
  dplyr::mutate(RGLB = "Unknown", Lane = "1",
                Read1File = paste0("/mount/fastqs/", Read1File),
                Read2File = paste0("/mount/fastqs/", Read2File)
                ) %>%
  dplyr::select(RGID, RGSM, RGLB, Lane, Read1File, Read2File) %>%
  readr::write_csv("LISTS/SBJ00306_inputs.csv")


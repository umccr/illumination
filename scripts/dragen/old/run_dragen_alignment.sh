/opt/edico/bin/dragen \
    --partial-reconfig HMM \
    --ignore-version-check true

tar -C /mount/index/hg19 -xvf /mount/index/hg19/hg19-cnv-anchored.v7.tar

/opt/edico/bin/dragen \
    --partial-reconfig HMM \
    --ignore-version-check true \
    -f \
    --ref-dir /mount/index/hg19 \
    --tumor-fastq1 /mount/fastqs/tumor_r1.fastq.gz \
    --tumor-fastq2 /mount/fastqs/tumor_r2.fastq.gz \
    -1 /mount/fastqs/normal_r1.fastq.gz \
    -2 /mount/fastqs/normal_r2.fastq.gz \
    --enable-variant-caller true \
    --vc-sample-name COLO829 \
    --output-directory /output/results \
    --output-file-prefix COLO829 \
    --intermediate-results-dir /ephemeral \
    --enable-map-align true \
    --output-format BAM \
    --enable-map-align-output true \
    --enable-duplicate-marking true \
    --lic-instance-id-location /opt/instance-identity

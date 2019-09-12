#!/usr/bin/env bash

aws ec2 run-instances \
    --image-id ami-08b65f78f4ef3cdc5 \
    --count 1 \
    --instance-type f1.2xlarge \
    --security-group-ids sg-c13f6abc \
    --subnet-id subnet-d93b35be \
    --region ap-southeast-2 \
    --user-data file://aws_ssm_agent_install_user_data.sh \
    --iam-instance-profile Name=ssm_manual_instance_role \
    --key-name peter-dragen

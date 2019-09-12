 [DEPRECATED: USE STRATUS INSTEAD] Setting up DRAGEN instance manually
=======================================================================

* Run `ssoaws`
* Choose `dev-admin`
* Run `bash setup_dragen_instance.sh`
  - This outputs a json structure. Find the `i-...` target ID and copy it
* Run `aws ssm start-session --target i-...`
  - This _should_ connect you to the EC2 instance containing the DRAGEN software


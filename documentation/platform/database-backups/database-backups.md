# Database Backups

## RDS Snapshots
All databases are backed up once per day. These are automated RDS instance
snapshots that AWS provides. A snapshot can also be triggered using the AWS
CLI via the command line using the IAM user which was created with our RDS.

## Restoring Snapshots
You can restore an RDS snapshot via the AWS console, or you can do it via the
command line. Snapshots are held for one week by default. This can be changed.

## Changing Frequency of Snapshots
Cloud Platform don't think the automated frequency can be increased beyond once
per day. However several other methods exist to perform automated backups such
as creating a cron job to trigger a backup via the AWS CLI, using a CircleCI
pipeline or backing up the data in some other way (e.g. pg_dump).

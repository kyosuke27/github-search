provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      name = var.app_name
    }
  }
}

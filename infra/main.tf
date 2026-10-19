resource "aws_s3_bucket" "ajax-github-pure-javascript-s3" {
  bucket = var.app_name

  tags = {
    name = var.app_name
  }
}
data "aws_iam_policy_document" "origin_bucket_policy" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalReadWrite"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.ajax-github-pure-javascript-s3.arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.ajax-github-pure-javascript-distribution.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "ajax-github-pure-javascript-policy" {
  bucket = aws_s3_bucket.ajax-github-pure-javascript-s3.bucket
  policy = data.aws_iam_policy_document.origin_bucket_policy.json
}

resource "aws_cloudfront_distribution" "ajax-github-pure-javascript-distribution" {
  origin {
    // bucket_regional_domain_name：s3のドメイン
    domain_name              = aws_s3_bucket.ajax-github-pure-javascript-s3.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = "ajax-github-pure-javascript-distribution"
  }
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "ajax-github-pure-javascript application"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "ajax-github-pure-javascript-distribution"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["JP", "US", "CA", "GB", "DE"]
    }
  }

  tags = {
    appName = "ajax-github-pure-javascript"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}


resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "default-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

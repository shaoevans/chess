
# $redis = Redis::Namespace.new("evanschess", :redis => Redis.new)
$redis = {}

# uri = URI.parse(ENV["REDISTOGO_URL"])
# REDIS = Redis.new(:url => uri)
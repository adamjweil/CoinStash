require 'twitter'

twitterProc = proc do |config|
  config.consumer_key = 'zJKXmNayoUhvawg4mTUjarghO'
  config.consumer_secret = '4lr5FMkTsZotJZP0Y42Se1QLdQypF9F9YF02N8FijNPfzAeU8R'
  config.access_token = '913777775366025216-aFqr9xLy1M0E86VIhV6K1bHruHxN92v'
  config.access_token_secret = 'F2JytpIjZOmbz3jcyhcNS0hnaP2s9L5yowJOCj050z53b'
end

Rails.application.config.assets.twitter_client = Twitter::REST::Client.new &twitterProc


Rails.application.config.assets.streaming_client = Twitter::Streaming::Client.new &twitterProc

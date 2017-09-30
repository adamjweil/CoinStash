class ApplicationController < ActionController::API
  protect_from_forgery
  before_action :load_tweets
  before_action :search_tweets


  def load_tweets
    @tweets = Rails.application.config.assets.twitter_client.user_timeline('BTCTN', count: 20)
  end

  def search_tweets
    @search = Rails.application.config.assets.twitter_client.search('#cryptocurrency -rt', lang: "en", count: 20 )
  end
end

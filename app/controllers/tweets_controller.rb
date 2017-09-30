class TweetsController < ApplicationController
  def find_by_user
    load_tweets
    render json: @tweets
  end

  def find_by_hashtag
    search_tweets
    render json: @search
  end
end

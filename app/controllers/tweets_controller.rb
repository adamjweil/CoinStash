class TweetsController < ApplicationController
  def find_by_user
    load_tweets
    render json: @tweets
  end

  def find_by_hashtag
    search_tweets
    render json: @search
  end

  def find_ethereum
    ethereum_tweets
    render json: @ETH_tweets
  end

  def find_litecoin
    litecoin_tweets
    render json: @LiteCoin_tweets
  end

  def find_bitcoin
    bitcoin_tweets
    render json: @BitCoin_tweets
  end
end

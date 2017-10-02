class ApplicationController < ActionController::API
  before_action :load_tweets
  before_action :search_tweets

  def log_in(user)
    session[:user_id] = user.id
  end

  # Remembers a user in a persistent session.
  # signed creates an encrypted cookie so that's why we use it.
  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # Returns true if the given user is the current user.
  def current_user?(user)
    user == current_user
  end

  # Returns the current logged-in user (if any).
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end

  # Forgets a persistent session.
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  def log_out
    forget(current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  # Redirects to stored location (or to the default).
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  # Stores the URL trying to be accessed.
  def store_location
    session[:forwarding_url] = request.url if request.get?
  end

  def load_tweets
    @tweets = Rails.application.config.assets.twitter_client.user_timeline('BTCTN', count: 20)
  end

  def search_tweets
    @search = Rails.application.config.assets.twitter_client.search('#cryptocurrency -rt', lang: "en", count: 20 )
  end

  def ethereum_tweets
    @ETH_tweets = Rails.application.config.assets.twitter_client.search('#ethereum -rt', lang: "en", count: 20)
  end

  def litecoin_tweets
    @LiteCoin_tweets = Rails.application.config.assets.twitter_client.search('#litecoin -rt', lang: "en", count: 20)
  end

  def bitcoin_tweets
    @BitCoin_tweets = Rails.application.config.assets.twitter_client.search('#bitcoin -rt', lang: "en", count: 20)
  end

end

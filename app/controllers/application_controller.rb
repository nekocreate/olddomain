class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception



 # iconやその他画像のURLの定義
  def images_icons
    # バックリンクのアイコン
    @alexa = "http://nyamu.sakura.ne.jp/img/alexa.png"
    @china = "http://nyamu.sakura.ne.jp/img/china.png"
    @chuui = "http://nyamu.sakura.ne.jp/img/chuui.png"
    @corp = "http://nyamu.sakura.ne.jp/img/corp.png"
    @delicious = "http://nyamu.sakura.ne.jp/img/delicious.png"
    @dmoz = "http://nyamu.sakura.ne.jp/img/dmoz.png"
    @edu = "http://nyamu.sakura.ne.jp/img/edu.png"
    @etc = "http://nyamu.sakura.ne.jp/img/etc.png"
    @facebook = "http://nyamu.sakura.ne.jp/img/facebook.png"
    @flickr = "http://nyamu.sakura.ne.jp/img/flickr.png"
    @googleplus = "http://nyamu.sakura.ne.jp/img/googleplus.png"
    @gov = "http://nyamu.sakura.ne.jp/img/gov.png"
    @gree = "http://nyamu.sakura.ne.jp/img/gree.png"
    @hatena = "http://nyamu.sakura.ne.jp/img/hatena.png"
    @linkedin = "http://nyamu.sakura.ne.jp/img/linkedin.png"
    @love = "http://nyamu.sakura.ne.jp/img/love.png"
    @mil = "http://nyamu.sakura.ne.jp/img/mil.png"
    @mixi = "http://nyamu.sakura.ne.jp/img/mixi.png"
    @muse = "http://nyamu.sakura.ne.jp/img/muse.png"
    @musicmoz = "http://nyamu.sakura.ne.jp/img/musicmoz.png"
    @myspace = "http://nyamu.sakura.ne.jp/img/myspace.png"
    @naver = "http://nyamu.sakura.ne.jp/img/naver.png"
    @official = "http://nyamu.sakura.ne.jp/img/official.png"
    @okwave = "http://nyamu.sakura.ne.jp/img/okwave.png"
    @pinterest = "http://nyamu.sakura.ne.jp/img/pinterest.png"
    @pocket = "http://nyamu.sakura.ne.jp/img/pocket.png"
    @reddit = "http://nyamu.sakura.ne.jp/img/reddit.png"
    @stumbleupon = "http://nyamu.sakura.ne.jp/img/stumbleupon.png"
    @tumblr = "http://nyamu.sakura.ne.jp/img/tumblr.png"
    @twitter = "http://nyamu.sakura.ne.jp/img/twitter.png"
    @wikipedia = "http://nyamu.sakura.ne.jp/img/wikipedia.png"
    @youtube = "http://nyamu.sakura.ne.jp/img/youtube.png"
    
    # sign in sns button
    @signintwitter = "http://nyamu.sakura.ne.jp/img/olddomain/signintwitter.gif"
  end

  # devise に追加したカラムを適用させるbefore_filterメソッド
  before_filter :configure_permitted_parameters, if: :devise_controller?
 
  protected
 
    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) << :admin
      devise_parameter_sanitizer.for(:account_update) << :admin

      devise_parameter_sanitizer.for(:sign_up) << :handlename
      devise_parameter_sanitizer.for(:account_update) << :handlename
      
      devise_parameter_sanitizer.for(:sign_up) << :promember
      devise_parameter_sanitizer.for(:account_update) << :promember
    end

end

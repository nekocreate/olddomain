class User < ActiveRecord::Base
  has_many :resposts
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable, :timeoutable,
         :omniauthable, :omniauth_providers => [:twitter]

  # 2015年10月12日追加
  # users/registrations_controller.rb に追加した
  # update アクション(パスワード不要でプロフィール更新可能)のメソッド
  # allow users to update their accounts without passwords
  def update_without_current_password(params, *options)
    params.delete(:current_password)

    if params[:password].blank? && params[:password_confirmation].blank?
      params.delete(:password)
      params.delete(:password_confirmation)
    end

    result = update_attributes(params, *options)
    clean_up_passwords
    result
  end

  # 公式サイト これではエラーが出た
  #def self.from_omniauth(auth)
  #  where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
  #    user.email = auth.info.email
  #    user.password = Devise.friendly_token[0,20]
  #    user.name = auth.info.name   # assuming the user model has a name
  #    user.image = auth.info.image # assuming the user model has an image
  #  end
  #end
  
  # 公式サイト これではエラーが出た。
  #def self.new_with_session(params, session)
  #  super.tap do |user|
  #    if data = session["devise.twitter_data"] && session["devise.twitter_data"]["extra"]["raw_info"]
  #      user.email = data["email"] if user.email.blank?
  #    end
  #  end
  #end

  # これだとエラーが出なくなった
  def self.from_omniauth(auth)
      where(provider: auth["provider"], uid: auth["uid"]).first_or_create do |user|
          user.provider = auth["provider"]
          user.uid = auth["uid"]
          user.username = auth["info"]["nickname"]
      end
  end

  # これだとエラーが出なくなった
  def self.new_with_session(params, session)
      if session["devise.user_attributes"]
          new(session["devise.user_attributes"], without_protection: true) do |user|
              user.attributes = params
              user.valid?
          end
      else
          super
      end
  end

end


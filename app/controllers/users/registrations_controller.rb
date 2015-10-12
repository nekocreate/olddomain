class Users::RegistrationsController < Devise::RegistrationsController

  ### ユーザープロフィールの更新を、パスワード不要にする処理 ###
  # update アクションは、公式サイトのものをそのまま引用して、一部だけ書き換えた。
  # 公式サイト
  # https://github.com/plataformatec/devise/blob/master/app/controllers/devise/registrations_controller.rb
  # 参考にしたサイト
  # http://easyramble.com/user-account-update-without-password-on-devise.html

  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)
  
    # 以下をコメントアウト
    # resource_updated = update_resource(resource, account_update_params)
    # パスワードなしのメソッドを追加した
    # update_without_current_password はUserモデルに実装してある
    resource_updated = resource.update_without_current_password(account_update_params)
    
    yield resource if block_given?
    if resource_updated
      if is_flashing_format?
        flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
          :update_needs_confirmation : :updated
        set_flash_message :notice, flash_key
      end
      sign_in resource_name, resource, bypass: true
      respond_with resource, location: after_update_path_for(resource)
    else
      clean_up_passwords resource
      respond_with resource
    end
  end
 
end

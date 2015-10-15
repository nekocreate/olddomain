class Users::SessionsController < Devise::SessionsController
  before_action :images_icons
  def new
    super
  end
 
  def create
    super
  end

  def destroy
    super
  end
end

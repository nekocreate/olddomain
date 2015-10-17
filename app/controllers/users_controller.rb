class UsersController < ApplicationController
    # deviseによるアクセス制限 ログインしていなければアクセス不可
    before_action :authenticate_user!
    
    before_action :admin_user
    
    def index
        @users = User.all
    end

    #def edit
    #    @user = User.find(params[:id])
    #end

    def update
        @user = User.find(params[:id])
        @user.update(handlename: params[:user][:handlename], admin: params[:user][:admin])
        flash[:success] = params[:id] + "をアップデートしました。"
        #redirect_to edit_user_path(@user)
        redirect_to request.referrer
    end
    
    def pro_upgrade
        # render text: params[:id]
        @user = User.find(params[:id])
        @user.update(promember: 'true')
        flash[:success] = @user.email + "をプロメンバーにアップグレードしました。"
        redirect_to request.referrer || root_path
    end
    
    def destroy
      @user = User.find(params[:id])
      @user.destroy
      flash[:success] = params[:id] + "を削除しました。"
      redirect_to request.referrer
    end

    private
    
    def admin_user
        redirect_to root_path unless current_user.admin?
    end

end

class ManageController < ApplicationController
    before_action :admin_user,     only: [:index]
    
    def index
        @forum = Forum.new
        @forums = Forum.all
    end


    private
    
    def admin_user
        redirect_to root_path unless current_user.admin?
    end
end

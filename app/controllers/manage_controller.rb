class ManageController < ApplicationController
    
    def index
        @forum = Forum.new
        @forums = Forum.all
    end
end

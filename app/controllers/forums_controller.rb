class ForumsController < ApplicationController
    before_action :authenticate_user!, only:[:show]
    before_action :no_promember, only: [:show]
    before_action :admin_user, only: [:create, :update, :destroy]
    
    # フォーラムの作成画面を表示する new_forum_path
    # def new
    # end
    
    # フォーラムを作ってデータベースに登録
    def create
        @forum = Forum.new(forum_params)
        @forum.save
        flash[:success] = "フォーラムを作成しました。"
        redirect_to request.referrer || manage_index_path
    end
    
    # 作成したフォーラムの編集画面 edit_forum_path()
    # def edit
    # end
    
    # フォーラムデータ（データベース）を更新する
    def update
        @forum = Forum.find(params[:id])
        @forum.update(title: params[:forum][:title], description: params[:forum][:description])
        flash[:success] = "フォーラムをアップデートしました。"
        redirect_to request.referrer || manage_index_path
    end
    
    # フォーラム一覧の表示 forums_path
    def index
        @forums = Forum.order(created_at: :desc) # 降順
        # 以下は上記と同じ
        # @forums = Forum.all.order(created_at: :desc)
        # @formus = Forum.order(:created_at).reverse_order

    end
    
    # 各フォーラムごとのページを表示 forum_path()
    def show
        @forum = Forum.find(params[:id])
        @respost = Respost.new
        # @resposts = Respost.order(created_at: :desc)
        # @resposts = Respost.order(updated_at: :desc)
        # 以下はkaminari適用
        ## @resposts = Respost.order(updated_at: :desc).page(params[:page]).per(5)
        # @resposts = Respost.order(updated_at: :desc).page(params[:page]).per(5) # 降順
        # @resposts = Respost.where(forum_id: params[:id]).order(updated_at: :desc).page(params[:page]).per(5) # 降順
        @resposts = Respost.where(forum_id: params[:id]).order(replaytime: :desc).page(params[:page]).per(5) # 降順
        @replayposts = Replaypost.all
        @users = User.all
    end
    
    # フォーラムを削除
    def destroy
        @forum = Forum.find(params[:id])
        @forum.destroy
        flash[:success] = "フォーラムを削除しました。"
        redirect_to request.referrer || manage_index_path        
    end

    private
    
    def forum_params
    # params[:forum]のパラメータで title , descriptionのみを許可する。
    # 返り値は ex:) {title: "入力されたtitle" , description: "入力されたdescription" }
    params.require(:forum).permit(:title, :description)
    end

    def admin_user
        redirect_to root_path unless current_user.admin?
    end

    def no_promember
        if !current_user.admin? && !current_user.promember?
           redirect_to message_forums_path
        end
    end
end

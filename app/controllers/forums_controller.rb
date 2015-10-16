class ForumsController < ApplicationController
    before_action :admin_user
    
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
        @forums = Forum.all
    end
    
    # 各フォーラムごとのページを表示 forum_path()
    def show
        @forum = Forum.find(params[:id])
        @respost = Respost.new
        @resposts = Respost.all
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
end

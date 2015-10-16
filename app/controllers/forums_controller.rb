class ForumsController < ApplicationController

    # フォーラムの作成画面を表示する new_forum_path
    def new
    end
    
    # フォーラムを作ってデータベースに登録
    def create
        @forum = Forum.new(forum_params)
        @forum.save
        flash[:success] = "フォーラムを作成しました。"
        redirect_to request.referrer || manage_index_path
    end
    
    # 作成したフォーラムの編集画面 edit_forum_path()
    def edit
    end
    
    # フォーラムデータ（データベース）を更新する
    def update
        @forum = Forum.find(params[:id])
        @forum.update(title: params[:forum][:title], description: params[:forum][:description])
        flash[:success] = "フォーラムをアップデートしました。"
        redirect_to request.referrer || manage_index_path
    end
    
    # フォーラム一覧の表示 forums_path
    def index
    end
    
    # 各フォーラムごとのページを表示 forum_path()
    def show
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
    # params[:message]のパラメータで name , bodyのみを許可する。
    # 返り値は ex:) {name: "入力されたname" , body: "入力されたbody" }
    params.require(:forum).permit(:title, :description)
  end
end

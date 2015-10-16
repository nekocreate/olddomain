class RespostsController < ApplicationController
    

    
    # 投稿を作ってデータベースに登録
    def create
       # render text: params
        @respost = Respost.new(respost_params)
        if @respost.save
            flash[:success] = "書き込みを投稿しました。"
            redirect_to request.referrer
            # redirect_to request.referrer || manage_index_path
        else
            flash[:danger] = "書き込み失敗"
            redirect_to request.referrer
        end
    end
    
    # 作成した投稿の編集画面 edit_forum_path()
    # def edit
    # end
    
    # 投稿データ（データベース）を更新する
    def update
        @respost = Respost.find(params[:id])
        @respost.update(title: params[:respost][:title], description: params[:respost][:content])
        flash[:success] = "書き込みをアップデートしました。"
        redirect_to request.referrer
        # redirect_to request.referrer || manage_index_path
    end
    
    # 投稿一覧の表示 forums_path
    def index
        @resposts = Respost.all
    end
    
    # 各投稿ごとのページを表示 forum_path()
    def show
        @respost = Respost.find(params[:id])
    end
    
    # 投稿を削除
    def destroy
        @respost = Respost.find(params[:id])
        @respost.destroy
        flash[:success] = "書き込みを削除しました。"
        redirect_to request.referrer
        # redirect_to request.referrer || manage_index_path        
    end

    private
    
    def respost_params
    # params[:respost]のパラメータで title , contentのみを許可する。
    # 返り値は ex:) {title: "入力されたtitle" , content: "入力されたcontent" }
    params.require(:respost).permit(:forum_id, :user_id, :title, :content)
    end
end

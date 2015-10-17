class RespostsController < ApplicationController
    # 本人以外による :edit :update :destroy は許可せずroot_pathへリダイレクト
    before_action :admin_user, only: [:edit, :update, :destroy]

    # 投稿を作ってデータベースに登録
    def create
       # render text: params
        @respost = Respost.new(respost_params)
        if @respost.save
            flash[:success] = "書き込みを投稿しました。"
            # redirect_to forum_path(params[:respost][:forum_id])
            redirect_to request.referrer || forum_path(params[:respost][:forum_id])
        else
            # render text: @respost.errors.inspect
            flash[:danger] = "書き込み失敗" ,"errors", @respost.errors
            ##### バリデーションのエラーメッセージの表示がうまくいかない
            @errors = @respost.errors
            redirect_to request.referrer
        end
    end
    
    # 作成した投稿の編集画面 
    def edit
        @respost = Respost.find(params[:id])
        # @forum = Forum.find(id: @respost.forum_id)
    end
    
    # 投稿データ（データベース）を更新する
    def update
        #render text: params[:respost][:forum_id]
        #render text: params
        @respost = Respost.find(params[:id])
        @respost.update(title: params[:respost][:title], content: params[:respost][:content])
        flash[:success] = "書き込みをアップデートしました。"
        #redirect_to request.referrer
        redirect_to forum_path(params[:respost][:forum_id])
    end
    
    # 投稿一覧の表示 forums_path
    # def index
    #    @resposts = Respost.all
    # end
    
    # 各投稿ごとのページを表示 forum_path()
    # def show
    #    @respost = Respost.find(params[:id])
    # end
    
    # 投稿を削除
    def destroy
        #render text: params
        @respost = Respost.find(params[:id])
        @respost.destroy
        flash[:success] = "書き込みを削除しました。"
        #redirect_to request.referrer
        redirect_to request.referrer || forum_path(params[:forum_id])       
    end

    private
    
    def respost_params
    # params[:respost]のパラメータで title , contentのみを許可する。
    # 返り値は ex:) {title: "入力されたtitle" , content: "入力されたcontent" }
    params.require(:respost).permit(:forum_id, :user_id, :title, :content)
    end
    
    # 本人以外の場合はroot_pathにリダイレクト current_userがadmin の場合は除く
    def admin_user
        @respost = Respost.find(params[:id])
        if !current_user.admin?
            redirect_to root_path unless current_user.id == @respost.user_id
        end
    end

end

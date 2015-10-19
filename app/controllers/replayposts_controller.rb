class ReplaypostsController < ApplicationController
    # deviseによるアクセス制限 ログインしていなければアクセス不可
    before_action :authenticate_user!
    before_action :no_promember
    # 本人以外による :edit :update :destroy は許可せずroot_pathへリダイレクト
    before_action :admin_user, only: [:edit, :update, :destroy]

    def new
        # render text: params
        @replaypost = Replaypost.new
        @replayposts = Replaypost.all
        @forum = Forum.find(params[:forum_id])
        @respost = Respost.find(params[:respost_id])
        @users = User.all
        @user = User.find(params[:user_id])
    end
    
    # 返信を作ってデータベースに登録
    def create
        # render text: params
        @replaypost = Replaypost.new(replaypost_params)
        
        @respost = Respost.find(params[:replaypost][:respost_id]) # 親のrespost(投稿)を取得
        if @replaypost.save
            
            # updated_atを更新せずにreplaytimeカラムのみ変更
            @respost.update_columns(replaytime: DateTime.now)
            
            flash[:success] = "返信を投稿しました。"
            # redirect_to forum_path(params[:replaypost][:forum_id])
        ##    redirect_to request.referrer || forum_path(params[:respost][:forum_id])
            redirect_to forum_path(params[:replaypost][:forum_id])
        else
            # render text: params
            @replayposts = Replaypost.all
            @forum = Forum.find(params[:replaypost][:forum_id])
            @respost = Respost.find(params[:replaypost][:respost_id])
            @users = User.all
            #@user = User.find(params[:replaypost][:user_id])
            # render text: @replaypost.errors.inspect
            flash[:danger] = "返信の投稿失敗"
            render 'replayposts/new'
        end
    end
    
    # 作成した返信の編集画面 edit_replaypost_path(:id)
    def edit
        @replaypost = Replaypost.find(params[:id])
    end
    
    # 返信データ（データベース）を更新する
    def update 
        #render text: params[:replaypost][:forum_id]
        #render text: params
        @replaypost = Replaypost.find(params[:id])
        @respost = Respost.find(@replaypost.respost_id) # 親のrespost(投稿)を取得
        
        if @replaypost.update(title: params[:replaypost][:title], content: params[:replaypost][:content], replaytime: params[:replaypost][:replaytime])
            flash[:success] = "返信をアップデートしました。"
            #redirect_to request.referrer
            redirect_to forum_path(params[:replaypost][:forum_id])
            
        else
            @forum = Forum.find(params[:replaypost][:forum_id])
            
            render 'replayposts/edit'
            
        end
    end
    
    # 返信一覧の表示 replayposts_path
    # def index
    #    @replayposts = Replaypost.all
    # end
    
    # 各返信ごとのページを表示 replaypost_path()
    # def show
    #    @respost = Respost.find(params[:id])
    # end
    
    # 投稿を削除
    def destroy
        #render text: params
        @replaypost = Replaypost.find(params[:id])
        @replaypost.destroy
        flash[:success] = "返信を削除しました。"
        #redirect_to request.referrer
        if request.referrer.include?("forums")
            redirect_to request.referrer || forum_path(params[:forum_id])
        end
        
        if request.referrer.include?("resposts")
            redirect_to request.referrer || respost_path(params[:respost_id])
        end
        
    end

    private
    
    def replaypost_params
    # params[:replaypost]のパラメータで title , contentのみを許可する。
    # 返り値は ex:) {title: "入力されたtitle" , content: "入力されたcontent" }
    params.require(:replaypost).permit(:forum_id, :respost_id, :user_id, :title, :content, :replaytime)
    end
    
    # 本人以外の場合はroot_pathにリダイレクト current_userがadmin の場合は除く
    def admin_user
        @replaypost = Replaypost.find(params[:id])
        if !current_user.admin?
            redirect_to root_path unless current_user.id == @replaypost.user_id
        end
    end

    def no_promember
        if !current_user.admin? && !current_user.promember?
           redirect_to message_forums_path
        end
    end

end

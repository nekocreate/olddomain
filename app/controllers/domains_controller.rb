class DomainsController < ApplicationController
  # domain_backlink_data_checkbefore_action :domain_backlink_data_check
  before_action :images_icons
  
  # deviseによるアクセス制限 ログインしていなければ show index ページへのアクセス不可
  before_action :authenticate_user!, only:[:show, :index]

  
  # ドメインデータのcsvを登録するフォームを設置
  def new
  end
  
  # domainモデルのテーブルにドメインデータを登録する
  def create
  end
  
  def test
    @domains_ok = Domain.where(ngcheck: "ok")
  end
  
  
  # csvをインポートする
  def import
    begin
      Domain.delete_all
      # fileはtmpに自動で一時保存される
      Domain.import(params[:file])
      redirect_to request.referrer, notice: "csvをインポートしました"
    rescue
      flash[:notice] = "ファイルが選択されていないか、ファイルが違っています。"
      redirect_to request.referrer
    end
  end
  
  # 各ドメインのバックリンクデータの詳細を表示する
  def show
    domain_backlink_data_check
    @domain = Domain.find(params[:id])
    @domain_name = @domain.name
    @domain_pr = @domain.pr
    @backlinks = Backlink.where(domain: @domain.name)
    
    # 有料会員以外
    if !current_user.promember
      if @domain_pr >= 1 # ページランクが1以上
        redirect_to root_path # root_pathへリダイレクト
        # redirect_to ****** # 有料会員登録を勧めるページへリダイレクトさせるのも良い
      end
    end
  end
  
  # 全ドメイン一覧を表示する
  def index
    domain_backlink_data_check
    @domains_ok = Domain.where(ngcheck: "ok")
    @backlinks = Backlink.all
  end
  
  def nglist
    domain_backlink_data_check
    @domains_ng = Domain.where.not(ngcheck: "ok")
  end

  # Domain Backlink テーブルにデータがなければリダイレクト
  def domain_backlink_data_check
    if !Domain.exists? || !Backlink.exists?
      redirect_to welcome_no_data_path
    end
  end
  
end

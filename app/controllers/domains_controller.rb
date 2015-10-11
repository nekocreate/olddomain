class DomainsController < ApplicationController
  before_action :backlink_icon
  
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
    @domain = Domain.find(params[:id])
    @domain_name = @domain.name
    @backlinks = Backlink.where(domain: @domain.name)
  end
  
  # 全ドメイン一覧を表示する
  def index
    @domains_ok = Domain.where(ngcheck: "ok")
    @backlinks = Backlink.all
  end
  
  def nglist
    @domains_ng = Domain.where.not(ngcheck: "ok")
  end

  
end

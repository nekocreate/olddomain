class DomainsController < ApplicationController
  before_action :backlink_icon
  
  # ドメインデータのcsvを登録するフォームを設置
  def new
  end
  
  # domainモデルのテーブルにドメインデータを登録する
  def create
  end
  
  def test
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
  
  # ドメインデータの詳細を表示する
  def show
    @domain = Domain.find(params[:id])
    @domain_name = @domain.name
    # @backlinks = Backlink.find_by(domain: @domain.name)
    @backlinks = Backlink.where(domain: @domain.name)
  end
  
  def index
    @domains = Domain.all
    @backlinks = Backlink.all
    
    # @wikipedia = "http://nyamu.sakura.ne.jp/img/wikipedia.png"
  end
  

  
end

class DomainsController < ApplicationController

  # ドメインデータのcsvを登録するフォームを設置
  def new
  end
  
  # domainモデルのテーブルにドメインデータを登録する
  def create
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
  #def show
  #end
  
  def index
    @domains = Domain.all
  end
  
end

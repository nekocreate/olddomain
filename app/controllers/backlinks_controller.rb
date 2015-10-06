class BacklinksController < ApplicationController

  # csvをインポートする
  def import
    #render text: params
    #begin
      Backlink.delete_all
      # fileはtmpに自動で一時保存される
      Backlink.import(params[:file])
      redirect_to request.referrer, notice: "csvをインポートしました"
    #rescue
    #  flash[:notice] = "ファイルが選択されていないか、ファイルが違っています。"
    #  redirect_to request.referrer
   #end
  end


end

class Backlink < ActiveRecord::Base

    # csvのインポートは右を参考にした http://ruby-rails.hatenadiary.com/entry/20141120/1416483136

    # CSVを読み込んで、DBに登録するインポート処理
    def self.import(file)
        CSV.foreach(file.path, headers: true) do |row|
            ## domainが見つかれば、レコードを呼び出し、見つかれなければ、新しく作成
            #backlink = find_by(name: row["domain"]) || new
            backlink = new
            # CSVからデータを取得し、設定する
            backlink.attributes = row.to_hash.slice(*updatable_attributes)
            # 保存する
            backlink.save!
            #backlink.creat
        end
    end


    # 更新を許可するカラムを定義
    def self.updatable_attributes
        ["domain", "pr", "ip", "followcheck", "obl", "bl_url", "bl_title", "anchor_text", "href_url"]
    end
end

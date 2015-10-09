class Domain < ActiveRecord::Base

    #validates :name, presence: true
    
    # csvのインポートは右を参考にした http://ruby-rails.hatenadiary.com/entry/20141120/1416483136

    # CSVを読み込んで、DBに登録するインポート処理
    def self.import(file)
        CSV.foreach(file.path, headers: true) do |row|
            # nameが見つかれば、レコードを呼び出し、見つかれなければ、新しく作成
            domain = find_by(name: row["name"]) || new
            # CSVからデータを取得し、設定する
            domain.attributes = row.to_hash.slice(*updatable_attributes)
            # 保存する
            domain.save!
        end
    end

    # 更新を許可するカラムを定義
    def self.updatable_attributes
        ["name", "pr", "wayback", "seocheki", "index_count", "dofollow_pr", "nofollow_pr",
        "awy", "china", "ip_bunsanritsu", "ip_unique_count", "ip_all_count", "moz_rank",
        "moz_da moz_pa", "ngcheck", "lookup_available_date", "gmt"]
    end
end

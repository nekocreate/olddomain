Rails.application.routes.draw do
  root 'welcome#index'
  
  # devise_for :admin_users の行が、mount RailsAdmin::Engine の行より上に来るようにします。
  devise_for :admin_users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # devise_for :admin_users の行が、mount RailsAdmin::Engine の行より上に来るようにします。
  
  # devise_for :users # 元々の
  # 2015年10月12日編集 deviseのコントローラーをカスタマイズ
  devise_for :users, :controllers => {
  :sessions      => "users/sessions",
  :registrations => "users/registrations",
  :passwords     => "users/passwords",
  :omniauth_callbacks => "users/omniauth_callbacks"
  }




  # get 'welcome/import' # ドメインインポート用
  get 'welcome/no_data' # ドメイン・バックリンクデータが存在しない場合の仮のペラページ
  get 'welcome/test' # テスト用

  
  resources :domains do
    member do
      # get 'test' # テスト用
    end
    
    collection do
      post 'import'
      get 'nglist'
      get 'test'
    end
  end

  resources :backlinks do
    member do
      # get 'test' # テスト用
    end
    
    collection do
      post "import"
    end
  end

  resources :users do
    member do
      post "pro_upgrade"
    end
    collection do
      #post "pro_upgrade"
    end
  end
 
  resources :forums, only: [:index, :update, :create, :show, :destroy]
  resources :manage, only: [:index]
  resources :users, only: [:index, :update, :destroy]
  # resources :users
  
  # createはテープルに登録する newは登録画面 indexはドメインのテーブル表1ページで表示する
  # showアクションを使わないのは、showアクションはrouteで生成されるurlのパターンに「:id」を含んでしまうため。
  resources :domains, only: [:create, :new, :index, :show]

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

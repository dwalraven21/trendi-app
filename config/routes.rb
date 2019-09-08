Rails.application.routes.draw do
	# root route
	  root 'site#index'

	  # posts routes
	  get 'api/posts', to: 'posts#index'
	  get 'api/posts/:id', to: 'posts#show'
	  post 'api/posts', to: 'posts#create'
	  delete 'api/posts/:id', to: 'posts#delete'
	  put 'api/posts/:id', to: 'posts#update'

	  # users routes
	  get 'users', to: 'users#index'
	  get 'users/:id', to: 'users#show'
	  post 'users', to: 'users#create'
	  delete 'users/:id', to: 'users#delete'
	  put 'users/:id', to: 'users#update'
end

Rails.application.routes.draw do
	# root route
	  root 'site#index'

	  # posts routes
	  get 'api/posts', to: 'posts#index'
	  get 'api/posts/:location', to: 'posts#show'
	  post 'api/posts', to: 'posts#create'
	  delete 'api/posts/:id', to: 'posts#delete'
	  put 'api/posts/:id', to: 'posts#update'

	  # users routes
	  get 'users', to: 'users#index'
	  post 'users', to: 'users#create'

	  # sessions routes
	  get 'sessions', to: 'sessions#index'
	  get 'sessions/:id', to: 'sessions#show'
	  post 'sessions', to: 'sessions#create'
	  delete 'sessions/:id', to: 'sessions#delete'
end

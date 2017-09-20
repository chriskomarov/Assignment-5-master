angular.module('listings').controller('ListingsController', ['$scope', '$location', '$stateParams', '$state', 'Listings', 
  function($scope, $location, $stateParams, $state, Listings){
    $scope.findmap = function() {
      /* set loader*/
      $scope.loading = true;

      /*map properties*/
      $scope.map = {
        center: {
          latitude: 29.643977,
          longitude: -82.354909
        },
        zoom: 12,
      }
      /* Get all the listings, then bind it to the scope */
      Listings.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.listings = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve listings!\n' + error;
      });
    };


    $scope.find = function() {
        /* set loader*/
        $scope.loading = true;
        $scope.error = null;
                  }
          /* Get all the listings, then bind it to the scope */
          Listings.getAll().then(function(response) {
            $scope.loading = false; //remove loader
            $scope.listings = response.data;
          }, function(error) {
            $scope.loading = false;
            $scope.error = 'Unable to retrieve listings!\n' + error;
          });
        };




    $scope.findOne = function() {
      debugger;
      $scope.loading = true;
      var id = $stateParams.listingId;
      Listings.read(id)
              .then(function(response) {
                $scope.listing = response.data;
                $scope.loading = false;
              }, function(error) {  
                $scope.error = 'Unable to retrieve listing with id "' + id + '"\n' + error;
                $scope.loading = false;
              });
    };  

    $scope.create = function(isValid) {
      $scope.error = null;

      /* 
        Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
       */
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      /* Create the listing object */
      var listing = {
        name: $scope.name, 
        code: $scope.code, 
        address: $scope.address
      };

      /* Save the article using the Listings factory */
      Listings.create(listing)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('listings.list', { successMessage: 'Listing succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save listing!\n' + error;
              });
    };

    $scope.update = function(isValid) {
      $scope.error = null;
      var id = $stateParams.listingId;
      /* 
        Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
       */
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }
      /* Create the listing object */
      var listing = {
        name: $scope.name, 
        code: $scope.code, 
        address: $scope.address
      };

      /* Save the article using the Listings factory */
      Listings.update(id, listing)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('listings.list', { successMessage: 'Listing succesfully updated!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to update listing!\n' + error;
              });
    };

    };

    $scope.remove = function() {
      $scope.error = null;
      var id = $stateParams.listingId;
      
      Listings.delete(id)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('listings.list', { successMessage: 'Listing succesfully deleted!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to delete listing!\n' + error;
              });
    };

    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }
  }
]);
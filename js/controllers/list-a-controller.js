angular.module('AngularApp')
    .controller('ListAController', ['$timeout', 'ItemStorage', '$scope', function($timeout, ItemStorage, $scope) {

        var ctrl = this;
        ctrl.list = ItemStorage.listA;
        ItemStorage.getListA().then(function(data){
            ctrl.list = data;
        });
        ctrl.newEntry = "";
        ctrl.message = "";

        ctrl.toggle = function(index) {
            var toggler = this;
            this.item = ctrl.list[index];
            ItemStorage.removeFromListA(toggler.item).then(function(response){
                ItemStorage.getListA().then(function(response){
                    ctrl.list = response;
                    toggler.item.list = 2;
                    ItemStorage.addToListB(toggler.item).then(function(response){
                    }, function(error){
                        console.log(error);
                    });
                });
            });
        };

        this.addEntry = function() {
            var newItem = {
                "name":ctrl.newEntry,
                "list":1
            };
            var success = ItemStorage.addToListA(newItem).then(function(response){
                ItemStorage.getListA().then(function(data){
                    ctrl.list = data;
                    ctrl.message = "success";
                });
            }, function(response){
                ctrl.message = "failure";
            });

            ctrl.newEntry = "";
            $timeout(function() {
                ctrl.message = " ";
            }, 2000);
        };

    }]);

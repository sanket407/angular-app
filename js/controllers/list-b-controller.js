angular.module('AngularApp')
    .controller('ListBController', ['$timeout', 'ItemStorage', '$scope', function($timeout, ItemStorage, $scope) {

        var ctrl = this;
        ctrl.list = ItemStorage.listB;
        ItemStorage.getListB().then(function(data){
            ctrl.list = data;
        });
        ctrl.newEntry = "";
        ctrl.message = "";

        ctrl.toggle = function(index) {
            var toggler = this;
            this.item = ctrl.list[index];
            ItemStorage.removeFromListB(toggler.item).then(function(response){
                ItemStorage.getListB().then(function(response){
                    ctrl.list = response;
                    toggler.item.list = 1;
                    ItemStorage.addToListA(toggler.item).then(function(response){
                    }, function(error){
                        console.log(error);
                    });
                });
            });
        };

        this.addEntry = function() {
            var newItem = {
                "name":ctrl.newEntry,
                "list":2
            };
            var success = ItemStorage.addToListB(newItem).then(function(response){
                ItemStorage.getListB().then(function(data){
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

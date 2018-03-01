angular.module('AngularApp')
    .controller('ListAController', ['$timeout', 'ItemStorage', function($timeout, ItemStorage) {

        var ctrl = this;
        ctrl.list = ItemStorage.listA;
        ItemStorage.getListA().then(function(data){
            ctrl.list = data;
        });
        ctrl.newEntry = "";
        ctrl.message = "";
        ctrl.toggle = function(index) {
            var item = ctrl.list[index];
            ItemStorage.removeFromListA(item).then(function(response){
                ItemStorage.addToListB(item);
                ItemStorage.getListA().then(function(data){
                    ctrl.list = data;
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
                //    console.log(ctrl.list);
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

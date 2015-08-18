/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        nfc.enabled(
            function(){alert("NFC enabled"); nfcEnabled()},
            function(){alert("NFC disabled")}
            );
        var nfcEnabled = function(){
          nfc.addTagDiscoveredListener(function(e){
            alert(nfc.bytesToHexString(e.tag.id));
          });

          nfc.hasHCE(
            function(){alert("HCE enabled"), hceEnabled()},
            function(){alert("HCE disabled")}
            );
          enableReadWrite();
        }

        var enableReadWrite=function(){
          var h = document.getElementById("read_write");
          h.style.display = "block";
        }
        var disableReadWrite=function(){
          var h = document.getElementById("read_write");
          h.style.display = "none";
        }
        var hceEnabled = function(){
          nfc.setHCEAccount("abc123");
          var h = document.getElementById("hce");
          h.style.display = "block";
          var accountButton = document.getElementById("account");
          var accountInput = document.getElementById("input_account");
          accountButton.addEventListener('click', function() { 
            nfc.setHCEAccount(accountInput.value);
          });
        }
        var writeButton = document.getElementById("write_data");
        var writeInput = document.getElementById("write_data_input");
        var blockInput = document.getElementById("data_block");
        var passwordInput = document.getElementById("password_input");
        var initNtagButton = document.getElementById("init_ntag");
        initNtagButton.addEventListener('click', function(){
          nfc.initNTAG213(passwordInput.value,_cb,_cb);
        });
        var _cb = function(r){alert(JSON.stringify(r));};
        writeButton.addEventListener('click', function() { 
          nfc.writeMifare(blockInput.value,writeInput.value,passwordInput.value,_cb,_cb);
        });
        var readButton = document.getElementById("read_data");
        readButton.addEventListener('click', function() { 
          nfc.readMifare(blockInput.value,passwordInput.value,_cb,_cb);
        });
        var writeFalseButton = document.getElementById("write_false");
        writeFalseButton.addEventListener('click', function() { 
          nfc.writeMifare(blockInput.value,false,passwordInput.value,_cb,_cb);
        });
        var writeTrueButton = document.getElementById("write_true");
        writeTrueButton.addEventListener('click', function() { 
          nfc.writeMifare(blockInput.value,true,passwordInput.value,_cb,_cb);
        });
        var writeIntegerButton = document.getElementById("write_integer");
        writeIntegerButton.addEventListener('click', function() { 
          nfc.writeMifare(blockInput.value,1,passwordInput.value,_cb,_cb);
        });
        var writeNullButton = document.getElementById("write_null");
        writeNullButton.addEventListener('click', function() { 
          nfc.writeMifare(blockInput.value,null,passwordInput.value,_cb,_cb);
        });
        var writeUndefinedButton = document.getElementById("write_undefined");
        writeUndefinedButton.addEventListener('click', function() { 
          nfc.writeMifare(blockInput.value,undefined,passwordInput.value,_cb,_cb);
        });

        console.log('Received Event: ' + id);
    }
};

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const enrollSchema = new Schema (
    { 
        _id: String,
        enrollmentSecret: String,
        packs:[String],
        host_details:{ 
            os_version:{ 
               build:String,
               major:String,
               minor:String,
               name:String,
               patch:String,
               platform:String,
               platform_like:String,
               version:String
            },
            osquery_info:{ 
               build_distro:String,
               build_platform:String,
               config_hash:String,
               config_valid:String,
               extensions:String,
               instance_id:String,
               pid:String,
               start_time:String,
               uuid:String,
               version:String,
               watcher:String
            },
            platform_info:{ 
               address:String,
               date:String,
               extra:String,
               revision:String,
               size:String,
               vendor:String,
               version:String,
               volume_size:String
            },
            system_info : {
                computer_name : String,
                cpu_brand : String,
                cpu_logical_cores  : String,
                cpu_physical_cores  : String,
                cpu_subtype  : String,
                cpu_type  : String,
                hardware_model  : String,
                hardware_serial  : String,
                hardware_vendor  : String,
                hardware_version  : String,
                hostname  : String,
                local_hostname  : String,
                physical_memory  : String,
                uuid  : String,
            }
    },
});

module.exports = mongoose.model('enrolledNode', enrollSchema, 'enrolledNodes');
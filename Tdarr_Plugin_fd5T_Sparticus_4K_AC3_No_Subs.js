


function details() {

  return {
    id: "Tdarr_Plugin_fd5T_Sparticus_4K_AC3_No_Subs",
    Name: "Sparticus 4K +AC3 No Subs Original container",
    Type: "Video",
    Description: `This plugin for 4K video removes subs and adds a main AC3 track if only a commentary AC3 track exists. The output container is the same as the original file. \n\n
`,
    Version: "1.00",
    Link: "https://github.com/HaveAGitGat/Tdarr_Plugin_hk75_Drawmonster_MP4_ac3_No_Subs_No_metaTitle"
  }

}

function plugin(file) {


  //Must return this object

  var response = {

     processFile : false,
     preset : '',
     container : '.mp4',
     handBrakeMode : false,
     FFmpegMode : false,
     reQueueAfter : false,
     infoLog : '',

  }


  response.container = '.' + file.container
  response.FFmpegMode = true




  if (file.fileMedium !== "video" || file.video_resolution !== "4KUHD") {


    console.log("File is not a 4K video")

    response.infoLog += " File is not a 4K video"
    response.processFile = false;

    return response

  } else { 

     var jsonString = JSON.stringify(file)

     var ffmpegDataString = JSON.stringify(file.ffProbeData)

    var ac3TrackCount = (ffmpegDataString.match(/ac3/g) || []).length;


    var hasAC3Commentary = false

   


  
     
     for(var i = 0; i < file.ffProbeData.streams.length; i++){

      try{


      if(file.ffProbeData.streams[i].codec_name.toLowerCase() == "ac3" && file.ffProbeData.streams[i].tags.title.toLowerCase() == "commentary"){

        hasAC3Commentary = true
      }

      }catch(err){}
      }


      var hasOneAC3TrackCommentary


      

      if(!!hasAC3Commentary && ac3TrackCount == 1){

        hasOneAC3TrackCommentary = true

      }else{

        hasOneAC3TrackCommentary = false

      }

    

     if(hasOneAC3TrackCommentary && jsonString.includes("subrip")){

      response.infoLog += "File has one AC3 track (commentary) and has subs"
      response.preset = '-sn,-map 0:v -map 0:a:0 -map 0:a -map 0:s? -map 0:d? -c copy -c:a:0 ac3'
      response.reQueueAfter = true;
      response.processFile = true;
      return response
     }



     if(!!hasOneAC3TrackCommentary == true){

      response.infoLog += " File has one AC3 track (commentary)"
      response.preset = ',-map 0:v -map 0:a:0 -map 0:a -map 0:s? -map 0:d? -c copy -c:a:0 ac3'
      response.reQueueAfter = true;
      response.processFile = true;
      return response

     }else{
      response.infoLog += " File does not have one AC3 track (commentary)"
     }



     if(jsonString.includes("subrip")){

      response.infoLog += " File has subs"
      response.preset = '-sn, -c:v copy -c:a copy'
      response.reQueueAfter = true;
      response.processFile = true;
      return response

     }else{
      response.infoLog += " File has no subs"
     }


     response.infoLog += " File meets conditions!"
     return response

  }
}

module.exports.details = details;

module.exports.plugin = plugin;

//Test data

// file.ffProbeData = { streams:
//   [ { index: 0,
//       codec_name: 'h264',
//       codec_long_name: 'H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10',
//       profile: 'High',
//       codec_type: 'video',
//       codec_time_base: '1001/48000',
//       codec_tag_string: '[0][0][0][0]',
//       codec_tag: '0x0000',
//       width: 1280,
//       height: 720,
//       coded_width: 1280,
//       coded_height: 720,
//       has_b_frames: 2,
//       sample_aspect_ratio: '1:1',
//       display_aspect_ratio: '16:9',
//       pix_fmt: 'yuv420p',
//       level: 41,
//       chroma_location: 'left',
//       refs: 1,
//       is_avc: 'true',
//       nal_length_size: '4',
//       r_frame_rate: '24000/1001',
//       avg_frame_rate: '24000/1001',
//       time_base: '1/1000',
//       start_pts: 0,
//       start_time: '0.000000',
//       bits_per_raw_sample: '8',
//       disposition:
//        { default: 1,
//          dub: 0,
//          original: 0,
//          comment: 0,
//          lyrics: 0,
//          karaoke: 0,
//          forced: 0,
//          hearing_impaired: 0,
//          visual_impaired: 0,
//          clean_effects: 0,
//          attached_pic: 0 },
//       tags: { language: 'eng' } },
//     { index: 1,
//       codec_name: 'ac3',
//       codec_long_name: 'ATSC A/52A (AC-3)',
//       codec_type: 'audio',
//       codec_time_base: '1/48000',
//       codec_tag_string: '[0][0][0][0]',
//       codec_tag: '0x0000',
//       sample_fmt: 'fltp',
//       sample_rate: '48000',
//       channels: 6,
//       channel_layout: '5.1(side)',
//       bits_per_sample: 0,
//       dmix_mode: '-1',
//       ltrt_cmixlev: '-1.000000',
//       ltrt_surmixlev: '-1.000000',
//       loro_cmixlev: '-1.000000',
//       loro_surmixlev: '-1.000000',
//       r_frame_rate: '0/0',
//       avg_frame_rate: '0/0',
//       time_base: '1/1000',
//       start_pts: 0,
//       start_time: '0.000000',
//       bit_rate: '640000',
//       disposition:
//        { default: 1,
//          dub: 0,
//          original: 0,
//          comment: 0,
//          lyrics: 0,
//          karaoke: 0,
//          forced: 0,
//          hearing_impaired: 0,
//          visual_impaired: 0,
//          clean_effects: 0,
//          attached_pic: 0 },
//       tags: { language: 'eng', title: 'commentary' } },
//     { index: 2,
//       codec_name: 'aac',
//       codec_long_name: 'AAC (Advanced Audio Coding)',
//       profile: 'HE-AAC',
//       codec_type: 'audio',
//       codec_time_base: '1/48000',
//       codec_tag_string: '[0][0][0][0]',
//       codec_tag: '0x0000',
//       sample_fmt: 'fltp',
//       sample_rate: '48000',
//       channels: 2,
//       channel_layout: 'stereo',
//       bits_per_sample: 0,
//       r_frame_rate: '0/0',
//       avg_frame_rate: '0/0',
//       time_base: '1/1000',
//       start_pts: 31,
//       start_time: '0.031000',
//       disposition:
//        { default: 0,
//          dub: 0,
//          original: 0,
//          comment: 0,
//          lyrics: 0,
//          karaoke: 0,
//          forced: 0,
//          hearing_impaired: 0,
//          visual_impaired: 0,
//          clean_effects: 0,
//          attached_pic: 0 },
//       tags: { language: 'eng' } },
//     { index: 3,
//       codec_name: 'subrip',
//       codec_long_name: 'SubRip subtitle',
//       codec_type: 'subtitle',
//       codec_time_base: '1/1000',
//       codec_tag_string: '[0][0][0][0]',
//       codec_tag: '0x0000',
//       r_frame_rate: '0/0',
//       avg_frame_rate: '0/0',
//       time_base: '1/1000',
//       start_pts: 0,
//       start_time: '0.000000',
//       duration_ts: 3601536,
//       duration: '3601.536000',
//       disposition:
//        { default: 0,
//          dub: 0,
//          original: 0,
//          comment: 0,
//          lyrics: 0,
//          karaoke: 0,
//          forced: 0,
//          hearing_impaired: 0,
//          visual_impaired: 0,
//          clean_effects: 0,
//          attached_pic: 0 },
//       tags: { language: 'eng' } },
//     { index: 4,
//       codec_name: 'subrip',
//       codec_long_name: 'SubRip subtitle',
//       codec_type: 'subtitle',
//       codec_time_base: '1/1000',
//       codec_tag_string: '[0][0][0][0]',
//       codec_tag: '0x0000',
//       r_frame_rate: '0/0',
//       avg_frame_rate: '0/0',
//       time_base: '1/1000',
//       start_pts: 0,
//       start_time: '0.000000',
//       duration_ts: 3601536,
//       duration: '3601.536000',
//       disposition:
//        { default: 0,
//          dub: 0,
//          original: 0,
//          comment: 0,
//          lyrics: 0,
//          karaoke: 0,
//          forced: 0,
//          hearing_impaired: 0,
//          visual_impaired: 0,
//          clean_effects: 0,
//          attached_pic: 0 },
//       tags: { language: 'eng', title: 'SDH' } } ],
//  format:
//   { filename:
//      '/storage/misc/downloads/Movie.mkv',
//     nb_streams: 5,
//     nb_programs: 0,
//     format_name: 'matroska,webm',
//     format_long_name: 'Matroska / WebM',
//     start_time: '0.000000',
//     duration: '3601.536000',
//     size: '4254332522',
//     bit_rate: '9450040',
//     probe_score: 100,
//     tags:
//      { encoder: 'libebml v1.3.0 + libmatroska v1.4.1',
//        creation_time: '2014-10-07 19:06:18' } } }

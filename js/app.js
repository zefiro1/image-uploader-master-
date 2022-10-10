$(document).ready(function () {
  var html = "";
  function writerUploading() {
    html += '<div class="loading-container">';
    html += "<h2>Uploading...</h2>";
    html += '<div class="progress-bar"';
    html += "</div>";
    html += "</div>";
    html += '<div class="rect">';
    html += "<div>";
    $("body").append(html);
  }

  function wiriterSuccess(url) {
    html = "";
    html += '<div class="card-container-success">';
    html += '<div class="card">';
    html += ' <span class="material-symbols-outlined">';
    html += "check";
    html += "</span>";
    html += '<h3 id="title-success">Uploaded Successfully!</h3>';
    html += '         <div class="imag-container">';
    html += '<img class="imagen" src="" alt="">';
    html += "         </div> ";
    html += '         <div class="text-area-container">';
    html += '             <input type="text" name="text" id="text" value="'+url+'" >';
    html += '             <input type="button" value="Copy Link" id="btn">';
    html += "         </div>";
    html += "     </div>";
    html += "</div>";

    $("body").append(html);
  }
  const $imgContainer = $(".imag-container");
  $imgContainer.on("dragenter", function (e) {
    e.preventDefault();
  });

  $imgContainer.on("dragover", function (e) {
    e.preventDefault();
  });

  $imgContainer.on("drop", function (e) {
    var archivos = e.originalEvent.dataTransfer.files;
    const formData = new FormData();
    if (archivos.length > 0) {
      var foto = archivos[0];
      formData.append("image", foto);
    }

    $(".card-container").remove();
    writerUploading();
    $(".rect").animate({ left: "236px" }, 5000, function () {
      $(".loading-container").hide();
      $.ajax({
        url: "https://api.imgbb.com/1/upload?key=e0d12d4f47a9493bb0ae268394eb582f",
        method: "POST",
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 0,
        mimeType: "multipart/form-data",
        success: function (response) {
          var jx = JSON.parse(response);
          var url = jx.data.url;
   

          wiriterSuccess(url);
          $(".imagen").attr("src", url);

          $("#btn").on("click", function (e) {
            console.log("click");
            $("#text").focus();
            $("#text").select();
            try {
              let successful = document.execCommand("copy");
              let msg = successful ? "successful" : "unsuccessful";
            } catch (err) {
              alert("Unable to copy");
            }
          });
        },
        error: function () {
          alert("error");
        },
      });
    });

    e.preventDefault();
  });

  $("#file").on("input", function (e) {
    const archivos = $(this)[0].files;

    const formData = new FormData();
    if (archivos.length > 0) {
      var foto = archivos[0];
      formData.append("image", foto);
    }

    $(".card-container").remove();

    writerUploading();

    $(".rect").animate({ left: "236px" }, 5000, function () {
      $(".loading-container").hide();
      $.ajax({
        url: "https://api.imgbb.com/1/upload?key=e0d12d4f47a9493bb0ae268394eb582f",
        method: "POST",
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 0,
        mimeType: "multipart/form-data",
        success: function (response) {
          var jx = JSON.parse(response);
          var url = jx.data.url;
   

          wiriterSuccess(url);
          $(".imagen").attr("src", url);

          $("#btn").on("click", function (e) {
            console.log("click");
            $("#text").focus();
            $("#text").select();
            try {
              let successful = document.execCommand("copy");
              let msg = successful ? "successful" : "unsuccessful";
            } catch (err) {
              alert("Unable to copy");
            }
            
          });
        },
        error: function () {
          alert("error");
        },
      });
      $("#btn").on("click", function (e) {
        console.log("click");
        $("#text").focus();
        $("#text").select();
        try {
          let successful = document.execCommand("copy");
        } catch (err) {
          alert("Unable to copy");
        }
      });
    });
  });
});

const SSD_MOBILENETV1 = 'ssd_mobilenetv1'

let selectedFaceDetector = SSD_MOBILENETV1

// ssd_mobilenetv1 options
let minConfidence = 0.5

// tiny_face_detector options
let inputSize = 512
let scoreThreshold = 0.5

function getFaceDetectorOptions() {
  return new faceapi.SsdMobilenetv1Options({ minConfidence })
}

function onInputSizeChanged(e) {
  changeInputSize(e.target.value)
  updateResults()
}

function getCurrentFaceDetectionNet() {
  if (selectedFaceDetector === SSD_MOBILENETV1) {
    return faceapi.nets.ssdMobilenetv1
  }
}

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

async function changeFaceDetector(detector) {
  ['#ssd_mobilenetv1_controls', '#tiny_face_detector_controls']
    .forEach(id => $(id).hide())

  selectedFaceDetector = detector
  const faceDetectorSelect = $('#selectFaceDetector')
  faceDetectorSelect.val(detector)
  faceDetectorSelect.material_select()

  $('#loader').show()
  if (!isFaceDetectionModelLoaded()) {
    await getCurrentFaceDetectionNet().load('/')
  }

  $(`#${detector}_controls`).show()
  $('#loader').hide()
}

async function onSelectedFaceDetectorChanged(e) {
  selectedFaceDetector = e.target.value

  await changeFaceDetector(e.target.value)
  updateResults()
}

function initFaceDetectionControls() {
  const faceDetectorSelect = $('#selectFaceDetector')
  faceDetectorSelect.val(selectedFaceDetector)
  faceDetectorSelect.on('change', onSelectedFaceDetectorChanged)
  faceDetectorSelect.material_select()

  const inputSizeSelect = $('#inputSize')
  inputSizeSelect.val(inputSize)
  inputSizeSelect.on('change', onInputSizeChanged)
  inputSizeSelect.material_select()
}

import { ACTIONS } from './utils/actions.js';

const ALLOWED_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

class PopupController {
  constructor() {
    this.profiles = [];
    this.elements = {
      fileInput: document.getElementById('excelFile'),
      startButton: document.getElementById('start'),
      loader: document.querySelector('.loader'),
      error: document.getElementById('error'),
      loadedCount: document.getElementById('loadedCount'),
    };
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.elements.fileInput.addEventListener(
      'change',
      this.handleFileUpload.bind(this),
    );
    this.elements.startButton.addEventListener(
      'click',
      this.handleStartOutreach.bind(this),
    );
  }

  async handleFileUpload(event) {
    const file = event.target.files[0];

    try {
      if (!file || !ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error('Please upload a valid Excel file');
      }

      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      this.profiles = XLSX.utils.sheet_to_json(firstSheet);

      this.updateUI({
        loadedCount: `Loaded ${this.profiles.length} profiles`,
        startButtonDisabled: this.profiles.length === 0,
      });
    } catch (error) {
      this.showError(error.message);
    }
  }

  async handleStartOutreach() {
    this.updateUI({ loading: true });

    try {
      await chrome.runtime.sendMessage({
        action: ACTIONS.POPUP_ACTIONS.START_OUTREACH,
        profiles: this.profiles,
      });
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.updateUI({ loading: false });
    }
  }

  /**
   * @description Update the user interface based on the current state,
   * such as showing/hiding the loader, updating the loaded profile count.
   * */
  updateUI({ loading = false, loadedCount = '', startButtonDisabled = false }) {
    this.elements.loader.classList.toggle('hidden', !loading);
    this.elements.startButton.disabled = startButtonDisabled || loading;
    this.elements.startButton.setAttribute('aria-busy', loading);
    if (loadedCount) {
      this.elements.loadedCount.textContent = loadedCount;
    }
  }

  /**
   * @description Show an error message to the user for a short duration of time.
   */
  showError(message) {
    this.elements.error.textContent = message;
    this.elements.error.classList.remove('hidden');
    setTimeout(() => this.elements.error.classList.add('hidden'), 5000);
  }
}

// Initialize the controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});

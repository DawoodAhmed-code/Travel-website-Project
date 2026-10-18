export interface OriginCity {
  id: string;
  name: string;
  province: string;
  division?: string;
  distanceToCapitalKm: number;
  extraDriveHoursToCapital: number;
  baseFlightFeeToCapital?: number;
}

export const ORIGIN_CITIES: OriginCity[] = [
  // ==========================================
  // FEDERAL CAPITAL TERRITORY & TWIN CITIES
  // ==========================================
  { id: 'isb', name: 'Islamabad', province: 'Capital Territory', division: 'Islamabad', distanceToCapitalKm: 0, extraDriveHoursToCapital: 0 },
  { id: 'rwp', name: 'Rawalpindi', province: 'Punjab', division: 'Rawalpindi', distanceToCapitalKm: 15, extraDriveHoursToCapital: 0.3 },
  { id: 'wah', name: 'Wah Cantt / Taxila', province: 'Punjab', division: 'Rawalpindi', distanceToCapitalKm: 35, extraDriveHoursToCapital: 0.6 },
  { id: 'atk', name: 'Attock', province: 'Punjab', division: 'Rawalpindi', distanceToCapitalKm: 85, extraDriveHoursToCapital: 1.2 },
  { id: 'ckw', name: 'Chakwal', province: 'Punjab', division: 'Rawalpindi', distanceToCapitalKm: 90, extraDriveHoursToCapital: 1.3 },
  { id: 'jhl', name: 'Jhelum', province: 'Punjab', division: 'Rawalpindi', distanceToCapitalKm: 115, extraDriveHoursToCapital: 1.8 },
  { id: 'guj', name: 'Gujrat', province: 'Punjab', division: 'Gujrat', distanceToCapitalKm: 170, extraDriveHoursToCapital: 2.3 },
  { id: 'mbd', name: 'Mandi Bahauddin', province: 'Punjab', division: 'Gujrat', distanceToCapitalKm: 190, extraDriveHoursToCapital: 2.8 },
  { id: 'wzb', name: 'Wazirabad', province: 'Punjab', division: 'Gujrat', distanceToCapitalKm: 195, extraDriveHoursToCapital: 2.7 },

  // ==========================================
  // PUNJAB (CENTRAL, NORTHERN & SOUTHERN CITIES)
  // ==========================================
  { id: 'lhr', name: 'Lahore', province: 'Punjab', division: 'Lahore', distanceToCapitalKm: 375, extraDriveHoursToCapital: 4.2 },
  { id: 'fsd', name: 'Faisalabad', province: 'Punjab', division: 'Faisalabad', distanceToCapitalKm: 320, extraDriveHoursToCapital: 3.8 },
  { id: 'mux', name: 'Multan', province: 'Punjab', division: 'Multan', distanceToCapitalKm: 535, extraDriveHoursToCapital: 5.8 },
  { id: 'gwa', name: 'Gujranwala', province: 'Punjab', division: 'Gujranwala', distanceToCapitalKm: 220, extraDriveHoursToCapital: 2.8 },
  { id: 'skt', name: 'Sialkot', province: 'Punjab', division: 'Gujranwala', distanceToCapitalKm: 240, extraDriveHoursToCapital: 3.2 },
  { id: 'bwp', name: 'Bahawalpur', province: 'Punjab', division: 'Bahawalpur', distanceToCapitalKm: 630, extraDriveHoursToCapital: 7.0 },
  { id: 'sgd', name: 'Sargodha', province: 'Punjab', division: 'Sargodha', distanceToCapitalKm: 220, extraDriveHoursToCapital: 2.8 },
  { id: 'swl', name: 'Sahiwal', province: 'Punjab', division: 'Sahiwal', distanceToCapitalKm: 410, extraDriveHoursToCapital: 4.8 },
  { id: 'oka', name: 'Okara', province: 'Punjab', division: 'Sahiwal', distanceToCapitalKm: 380, extraDriveHoursToCapital: 4.5 },
  { id: 'ksr', name: 'Kasur', province: 'Punjab', division: 'Lahore', distanceToCapitalKm: 420, extraDriveHoursToCapital: 5.0 },
  { id: 'ryk', name: 'Rahim Yar Khan', province: 'Punjab', division: 'Bahawalpur', distanceToCapitalKm: 780, extraDriveHoursToCapital: 8.8 },
  { id: 'dgk', name: 'Dera Ghazi Khan', province: 'Punjab', division: 'D.G. Khan', distanceToCapitalKm: 510, extraDriveHoursToCapital: 6.2 },
  { id: 'skp', name: 'Sheikhupura', province: 'Punjab', division: 'Lahore', distanceToCapitalKm: 340, extraDriveHoursToCapital: 4.0 },
  { id: 'jhg', name: 'Jhang', province: 'Punjab', division: 'Faisalabad', distanceToCapitalKm: 345, extraDriveHoursToCapital: 4.2 },
  { id: 'cnt', name: 'Chiniot', province: 'Punjab', division: 'Faisalabad', distanceToCapitalKm: 280, extraDriveHoursToCapital: 3.5 },
  { id: 'hfd', name: 'Hafizabad', province: 'Punjab', division: 'Gujranwala', distanceToCapitalKm: 250, extraDriveHoursToCapital: 3.2 },
  { id: 'kmk', name: 'Kamoke', province: 'Punjab', division: 'Gujranwala', distanceToCapitalKm: 245, extraDriveHoursToCapital: 3.1 },
  { id: 'mrd', name: 'Muridke', province: 'Punjab', division: 'Lahore', distanceToCapitalKm: 320, extraDriveHoursToCapital: 3.9 },
  { id: 'khw', name: 'Khanewal', province: 'Punjab', division: 'Multan', distanceToCapitalKm: 490, extraDriveHoursToCapital: 5.4 },
  { id: 'mnw', name: 'Mianwali', province: 'Punjab', division: 'Sargodha', distanceToCapitalKm: 240, extraDriveHoursToCapital: 3.5 },
  { id: 'bwn', name: 'Bahawalnagar', province: 'Punjab', division: 'Bahawalpur', distanceToCapitalKm: 560, extraDriveHoursToCapital: 6.8 },
  { id: 'vhr', name: 'Vehari', province: 'Punjab', division: 'Multan', distanceToCapitalKm: 510, extraDriveHoursToCapital: 5.8 },
  { id: 'mzg', name: 'Muzaffargarh', province: 'Punjab', division: 'D.G. Khan', distanceToCapitalKm: 550, extraDriveHoursToCapital: 6.3 },
  { id: 'pkp', name: 'Pakpattan', province: 'Punjab', division: 'Sahiwal', distanceToCapitalKm: 440, extraDriveHoursToCapital: 5.2 },
  { id: 'bhk', name: 'Bhakkar', province: 'Punjab', division: 'Sargodha', distanceToCapitalKm: 360, extraDriveHoursToCapital: 4.8 },
  { id: 'tts', name: 'Toba Tek Singh', province: 'Punjab', division: 'Faisalabad', distanceToCapitalKm: 350, extraDriveHoursToCapital: 4.2 },
  { id: 'lyh', name: 'Layyah', province: 'Punjab', division: 'D.G. Khan', distanceToCapitalKm: 460, extraDriveHoursToCapital: 5.7 },
  { id: 'ldh', name: 'Lodhran', province: 'Punjab', division: 'Multan', distanceToCapitalKm: 575, extraDriveHoursToCapital: 6.4 },
  { id: 'khs', name: 'Khushab / Joharabad', province: 'Punjab', division: 'Sargodha', distanceToCapitalKm: 230, extraDriveHoursToCapital: 3.3 },
  { id: 'ptk', name: 'Pattoki', province: 'Punjab', division: 'Lahore', distanceToCapitalKm: 420, extraDriveHoursToCapital: 4.8 },
  { id: 'nrw', name: 'Narowal', province: 'Punjab', division: 'Gujranwala', distanceToCapitalKm: 290, extraDriveHoursToCapital: 3.9 },
  { id: 'bhw', name: 'Bhalwal', province: 'Punjab', division: 'Sargodha', distanceToCapitalKm: 200, extraDriveHoursToCapital: 2.7 },
  { id: 'bkt', name: 'Kot Addu', province: 'Punjab', division: 'D.G. Khan', distanceToCapitalKm: 520, extraDriveHoursToCapital: 6.1 },
  { id: 'hsn', name: 'Hasan Abdal', province: 'Punjab', division: 'Rawalpindi', distanceToCapitalKm: 48, extraDriveHoursToCapital: 0.7 },
  { id: 'mrr', name: 'Murree', province: 'Punjab', division: 'Rawalpindi', distanceToCapitalKm: 60, extraDriveHoursToCapital: 1.2 },

  // ==========================================
  // SINDH (MEGA CITIES, UPPER & LOWER SINDH)
  // ==========================================
  { id: 'khi', name: 'Karachi', province: 'Sindh', division: 'Karachi', distanceToCapitalKm: 1410, extraDriveHoursToCapital: 17.5, baseFlightFeeToCapital: 32000 },
  { id: 'hyd', name: 'Hyderabad', province: 'Sindh', division: 'Hyderabad', distanceToCapitalKm: 1250, extraDriveHoursToCapital: 15.5, baseFlightFeeToCapital: 30000 },
  { id: 'skr', name: 'Sukkur', province: 'Sindh', division: 'Sukkur', distanceToCapitalKm: 930, extraDriveHoursToCapital: 10.5, baseFlightFeeToCapital: 26000 },
  { id: 'lrk', name: 'Larkana', province: 'Sindh', division: 'Larkana', distanceToCapitalKm: 980, extraDriveHoursToCapital: 11.5 },
  { id: 'nwb', name: 'Nawabshah (Shaheed Benazirabad)', province: 'Sindh', division: 'Shaheed Benazirabad', distanceToCapitalKm: 1120, extraDriveHoursToCapital: 13.5 },
  { id: 'mpk', name: 'Mirpur Khas', province: 'Sindh', division: 'Mirpur Khas', distanceToCapitalKm: 1310, extraDriveHoursToCapital: 16.0 },
  { id: 'jcb', name: 'Jacobabad', province: 'Sindh', division: 'Larkana', distanceToCapitalKm: 910, extraDriveHoursToCapital: 11.0 },
  { id: 'skp_s', name: 'Shikarpur', province: 'Sindh', division: 'Larkana', distanceToCapitalKm: 940, extraDriveHoursToCapital: 11.2 },
  { id: 'khp', name: 'Khairpur', province: 'Sindh', division: 'Sukkur', distanceToCapitalKm: 950, extraDriveHoursToCapital: 11.0 },
  { id: 'ddu', name: 'Dadu', province: 'Sindh', division: 'Hyderabad', distanceToCapitalKm: 1150, extraDriveHoursToCapital: 14.0 },
  { id: 'tht', name: 'Thatta', province: 'Sindh', division: 'Banbhore', distanceToCapitalKm: 1480, extraDriveHoursToCapital: 18.0 },
  { id: 'bdn', name: 'Badin', province: 'Sindh', division: 'Banbhore', distanceToCapitalKm: 1420, extraDriveHoursToCapital: 17.5 },
  { id: 'gtk', name: 'Ghotki', province: 'Sindh', division: 'Sukkur', distanceToCapitalKm: 860, extraDriveHoursToCapital: 10.0 },
  { id: 'tda', name: 'Tando Adam', province: 'Sindh', division: 'Shaheed Benazirabad', distanceToCapitalKm: 1210, extraDriveHoursToCapital: 14.5 },
  { id: 'tay', name: 'Tando Allahyar', province: 'Sindh', division: 'Hyderabad', distanceToCapitalKm: 1280, extraDriveHoursToCapital: 15.5 },
  { id: 'kms', name: 'Kashmore / Kandhkot', province: 'Sindh', division: 'Larkana', distanceToCapitalKm: 830, extraDriveHoursToCapital: 9.8 },
  { id: 'umk', name: 'Umerkot', province: 'Sindh', division: 'Mirpur Khas', distanceToCapitalKm: 1380, extraDriveHoursToCapital: 17.0 },
  { id: 'jsh', name: 'Kotri / Jamshoro', province: 'Sindh', division: 'Hyderabad', distanceToCapitalKm: 1260, extraDriveHoursToCapital: 15.5 },

  // ==========================================
  // KHYBER PAKHTUNKHWA (KPK)
  // ==========================================
  { id: 'pew', name: 'Peshawar', province: 'Khyber Pakhtunkhwa', division: 'Peshawar', distanceToCapitalKm: 170, extraDriveHoursToCapital: 2.0 },
  { id: 'atd', name: 'Abbottabad', province: 'Khyber Pakhtunkhwa', division: 'Hazara', distanceToCapitalKm: 120, extraDriveHoursToCapital: 1.8 },
  { id: 'mdn', name: 'Mardan', province: 'Khyber Pakhtunkhwa', division: 'Mardan', distanceToCapitalKm: 140, extraDriveHoursToCapital: 1.8 },
  { id: 'swt', name: 'Swat (Mingora)', province: 'Khyber Pakhtunkhwa', division: 'Malakand', distanceToCapitalKm: 245, extraDriveHoursToCapital: 3.5 },
  { id: 'msr', name: 'Mansehra', province: 'Khyber Pakhtunkhwa', division: 'Hazara', distanceToCapitalKm: 145, extraDriveHoursToCapital: 2.0 },
  { id: 'hrp', name: 'Haripur', province: 'Khyber Pakhtunkhwa', division: 'Hazara', distanceToCapitalKm: 70, extraDriveHoursToCapital: 1.1 },
  { id: 'kht', name: 'Kohat', province: 'Khyber Pakhtunkhwa', division: 'Kohat', distanceToCapitalKm: 220, extraDriveHoursToCapital: 2.9 },
  { id: 'dik', name: 'Dera Ismail Khan', province: 'Khyber Pakhtunkhwa', division: 'D.I. Khan', distanceToCapitalKm: 340, extraDriveHoursToCapital: 4.4 },
  { id: 'ban', name: 'Bannu', province: 'Khyber Pakhtunkhwa', division: 'Bannu', distanceToCapitalKm: 310, extraDriveHoursToCapital: 4.1 },
  { id: 'swb', name: 'Swabi', province: 'Khyber Pakhtunkhwa', division: 'Mardan', distanceToCapitalKm: 100, extraDriveHoursToCapital: 1.3 },
  { id: 'nsh', name: 'Nowshera', province: 'Khyber Pakhtunkhwa', division: 'Peshawar', distanceToCapitalKm: 130, extraDriveHoursToCapital: 1.6 },
  { id: 'chs', name: 'Charsadda', province: 'Khyber Pakhtunkhwa', division: 'Peshawar', distanceToCapitalKm: 160, extraDriveHoursToCapital: 2.1 },
  { id: 'cht', name: 'Chitral', province: 'Khyber Pakhtunkhwa', division: 'Malakand', distanceToCapitalKm: 380, extraDriveHoursToCapital: 7.0 },
  { id: 'dir', name: 'Timergara (Dir Lower/Upper)', province: 'Khyber Pakhtunkhwa', division: 'Malakand', distanceToCapitalKm: 310, extraDriveHoursToCapital: 5.5 },
  { id: 'btg', name: 'Battagram', province: 'Khyber Pakhtunkhwa', division: 'Hazara', distanceToCapitalKm: 210, extraDriveHoursToCapital: 3.0 },
  { id: 'bnr', name: 'Buner (Daggar)', province: 'Khyber Pakhtunkhwa', division: 'Malakand', distanceToCapitalKm: 180, extraDriveHoursToCapital: 2.8 },
  { id: 'mlk', name: 'Malakand (Batkhela)', province: 'Khyber Pakhtunkhwa', division: 'Malakand', distanceToCapitalKm: 200, extraDriveHoursToCapital: 2.8 },
  { id: 'hgu', name: 'Hangu', province: 'Khyber Pakhtunkhwa', division: 'Kohat', distanceToCapitalKm: 260, extraDriveHoursToCapital: 3.5 },
  { id: 'krk', name: 'Karak', province: 'Khyber Pakhtunkhwa', division: 'Kohat', distanceToCapitalKm: 280, extraDriveHoursToCapital: 3.7 },
  { id: 'khs_k', name: 'Kohistan (Dasu/Besham)', province: 'Khyber Pakhtunkhwa', division: 'Hazara', distanceToCapitalKm: 270, extraDriveHoursToCapital: 4.8 },
  { id: 'tnk', name: 'Tank', province: 'Khyber Pakhtunkhwa', division: 'D.I. Khan', distanceToCapitalKm: 390, extraDriveHoursToCapital: 5.2 },
  { id: 'pcr', name: 'Parachinar (Kurram)', province: 'Khyber Pakhtunkhwa', division: 'Kohat', distanceToCapitalKm: 360, extraDriveHoursToCapital: 5.5 },

  // ==========================================
  // BALOCHISTAN
  // ==========================================
  { id: 'uet', name: 'Quetta', province: 'Balochistan', division: 'Quetta', distanceToCapitalKm: 920, extraDriveHoursToCapital: 12.5, baseFlightFeeToCapital: 28000 },
  { id: 'gdr', name: 'Gwadar', province: 'Balochistan', division: 'Makran', distanceToCapitalKm: 1850, extraDriveHoursToCapital: 23.0, baseFlightFeeToCapital: 36000 },
  { id: 'trb', name: 'Turbat', province: 'Balochistan', division: 'Makran', distanceToCapitalKm: 1720, extraDriveHoursToCapital: 21.0 },
  { id: 'kzd', name: 'Khuzdar', province: 'Balochistan', division: 'Kalat', distanceToCapitalKm: 1200, extraDriveHoursToCapital: 15.5 },
  { id: 'zrt', name: 'Ziarat', province: 'Balochistan', division: 'Sibi', distanceToCapitalKm: 890, extraDriveHoursToCapital: 12.0 },
  { id: 'sbi', name: 'Sibi', province: 'Balochistan', division: 'Sibi', distanceToCapitalKm: 760, extraDriveHoursToCapital: 10.0 },
  { id: 'zhb', name: 'Zhob', province: 'Balochistan', division: 'Zhob', distanceToCapitalKm: 580, extraDriveHoursToCapital: 8.0 },
  { id: 'chn', name: 'Chaman', province: 'Balochistan', division: 'Quetta', distanceToCapitalKm: 1040, extraDriveHoursToCapital: 14.0 },
  { id: 'hub', name: 'Hub Chowki', province: 'Balochistan', division: 'Lasbela', distanceToCapitalKm: 1390, extraDriveHoursToCapital: 17.5 },
  { id: 'lrl', name: 'Loralai', province: 'Balochistan', division: 'Zhob', distanceToCapitalKm: 690, extraDriveHoursToCapital: 9.5 },
  { id: 'dmj', name: 'Dera Murad Jamali', province: 'Balochistan', division: 'Nasirabad', distanceToCapitalKm: 840, extraDriveHoursToCapital: 10.5 },
  { id: 'psh', name: 'Pishin', province: 'Balochistan', division: 'Quetta', distanceToCapitalKm: 960, extraDriveHoursToCapital: 13.0 },
  { id: 'nsk', name: 'Nushki', province: 'Balochistan', division: 'Rakhshan', distanceToCapitalKm: 1060, extraDriveHoursToCapital: 14.5 },
  { id: 'orm', name: 'Ormara', province: 'Balochistan', division: 'Makran', distanceToCapitalKm: 1680, extraDriveHoursToCapital: 20.5 },
  { id: 'psn', name: 'Pasni', province: 'Balochistan', division: 'Makran', distanceToCapitalKm: 1780, extraDriveHoursToCapital: 22.0 },

  // ==========================================
  // AZAD JAMMU & KASHMIR (AJK)
  // ==========================================
  { id: 'mzf', name: 'Muzaffarabad', province: 'Azad Kashmir', division: 'Muzaffarabad', distanceToCapitalKm: 130, extraDriveHoursToCapital: 3.2 },
  { id: 'mpr', name: 'Mirpur (AJK)', province: 'Azad Kashmir', division: 'Mirpur', distanceToCapitalKm: 135, extraDriveHoursToCapital: 2.1 },
  { id: 'rwk', name: 'Rawalakot', province: 'Azad Kashmir', division: 'Poonch', distanceToCapitalKm: 125, extraDriveHoursToCapital: 3.2 },
  { id: 'ktl', name: 'Kotli', province: 'Azad Kashmir', division: 'Mirpur', distanceToCapitalKm: 160, extraDriveHoursToCapital: 3.5 },
  { id: 'bgh', name: 'Bagh', province: 'Azad Kashmir', division: 'Poonch', distanceToCapitalKm: 145, extraDriveHoursToCapital: 3.6 },
  { id: 'bhm', name: 'Bhimber', province: 'Azad Kashmir', division: 'Mirpur', distanceToCapitalKm: 175, extraDriveHoursToCapital: 2.9 },
  { id: 'pld', name: 'Pallandri (Sudhanoti)', province: 'Azad Kashmir', division: 'Poonch', distanceToCapitalKm: 110, extraDriveHoursToCapital: 2.8 },
  { id: 'hvl', name: 'Haveli (Forward Kahuta)', province: 'Azad Kashmir', division: 'Poonch', distanceToCapitalKm: 210, extraDriveHoursToCapital: 5.5 },

  // ==========================================
  // GILGIT-BALTISTAN (NORTHERN REGIONS)
  // ==========================================
  { id: 'glt', name: 'Gilgit', province: 'Gilgit-Baltistan', division: 'Gilgit', distanceToCapitalKm: 510, extraDriveHoursToCapital: 11.5, baseFlightFeeToCapital: 22000 },
  { id: 'kdu', name: 'Skardu', province: 'Gilgit-Baltistan', division: 'Baltistan', distanceToCapitalKm: 630, extraDriveHoursToCapital: 14.0, baseFlightFeeToCapital: 24000 },
  { id: 'cls', name: 'Chilas (Diamer)', province: 'Gilgit-Baltistan', division: 'Diamer', distanceToCapitalKm: 380, extraDriveHoursToCapital: 8.5 },
  { id: 'hnz', name: 'Hunza (Karimabad / Aliabad)', province: 'Gilgit-Baltistan', division: 'Hunza', distanceToCapitalKm: 580, extraDriveHoursToCapital: 13.5 },
  { id: 'ast', name: 'Astore (Gorikot)', province: 'Gilgit-Baltistan', division: 'Diamer', distanceToCapitalKm: 480, extraDriveHoursToCapital: 12.0 },
  { id: 'ghz', name: 'Ghizer (Gahkuch / Phander)', province: 'Gilgit-Baltistan', division: 'Gilgit', distanceToCapitalKm: 580, extraDriveHoursToCapital: 14.0 },
  { id: 'kpl', name: 'Khaplu (Ghanche)', province: 'Gilgit-Baltistan', division: 'Baltistan', distanceToCapitalKm: 730, extraDriveHoursToCapital: 16.5 },
  { id: 'shg', name: 'Shigar', province: 'Gilgit-Baltistan', division: 'Baltistan', distanceToCapitalKm: 660, extraDriveHoursToCapital: 15.0 },

  // ==========================================
  // OVERSEAS / INTERNATIONAL ARRIVALS
  // ==========================================
  { id: 'overseas-isb', name: 'Overseas (Islamabad Airport Arrival - UK / USA / Gulf / Europe)', province: 'International Arrivals', division: 'International', distanceToCapitalKm: 0, extraDriveHoursToCapital: 0 },
  { id: 'overseas-lhr', name: 'Overseas (Lahore Airport Arrival)', province: 'International Arrivals', division: 'International', distanceToCapitalKm: 375, extraDriveHoursToCapital: 4.2 },
  { id: 'overseas-khi', name: 'Overseas (Karachi Airport Arrival)', province: 'International Arrivals', division: 'International', distanceToCapitalKm: 1410, extraDriveHoursToCapital: 17.5 }
];

export interface VehicleFacility {
  id: string;
  name: string;
  category: 'private-suv' | 'private-car' | 'private-van' | 'tourist-bus' | 'public-bus' | 'local-transport' | 'flight';
  categoryGroup: 'bus' | 'private' | 'local' | 'flight';
  tag: string;
  badgeColor: string;
  description: string;
  capacityText: string;
  baggageAllowance: string;
  suitableFor: string;
  costMultiplier: number;
  fixedDailyPKR: number;
  iconName: 'car' | 'suv' | 'bus' | 'plane';
  features: string[];
}

export const VEHICLE_FACILITIES: VehicleFacility[] = [
  // 1. PRIVATE VEHICLES
  {
    id: 'private-prado',
    name: 'Private 4x4 Mountain Prado / Fortuner (Dedicated Chauffeur)',
    category: 'private-suv',
    categoryGroup: 'private',
    tag: 'Top Luxury & Off-Road',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Dedicated Toyota Land Cruiser Prado / Fortuner with an expert high-altitude chauffeur. Goes directly to Deosai Plateau, Fairy Meadows Raikot, Babusar, and Mahodand without vehicle switches.',
    capacityText: '4 to 6 Persons',
    baggageAllowance: '5 Large Bags + Hand Carry',
    suitableFor: 'Families, honeymoon couples & VIP mountain expeditions',
    costMultiplier: 1.5,
    fixedDailyPKR: 16000,
    iconName: 'suv',
    features: ['High-ground 4x4 clearance', 'Dual AC & heater', 'Spontaneous photo stops anywhere', 'Chauffeur food & lodging covered']
  },
  {
    id: 'private-car',
    name: 'Private Dedicated AC Sedan (Corolla / Yaris / Civic)',
    category: 'private-car',
    categoryGroup: 'private',
    tag: 'Couples & Small Families',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Comfortable chilled AC sedan dedicated exclusively to your family. Great fuel economy, smooth motorway ride, with complete privacy and itinerary flexibility.',
    capacityText: '1 to 4 Persons',
    baggageAllowance: '3 Standard Bags',
    suitableFor: 'Small families, couples & budget private travel',
    costMultiplier: 1.0,
    fixedDailyPKR: 9500,
    iconName: 'car',
    features: ['Dedicated licensed driver', 'Chilled AC & Bluetooth audio', 'Doorstep pickup from your city', 'Tolls & fuel included']
  },
  {
    id: 'private-hiace',
    name: 'Private Executive Grand Cabin / Hiace (13-Seater)',
    category: 'private-van',
    categoryGroup: 'private',
    tag: 'Family Groups & Friends',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Toyota Grand Cabin with high roof, extra large rear luggage room, reclining seats, and dual rooftop AC. The top choice for larger family units and friendly groups.',
    capacityText: '7 to 13 Persons',
    baggageAllowance: '10 to 14 Bags',
    suitableFor: 'Joint family reunions & corporate teams',
    costMultiplier: 1.25,
    fixedDailyPKR: 14500,
    iconName: 'suv',
    features: ['High roof standing room', 'Dual AC vents on every row', 'Reclining velour seats', 'Large roof cargo rack']
  },
  {
    id: 'private-coaster',
    name: 'Private Dedicated Luxury Tourist Coaster (22-Seater)',
    category: 'private-van',
    categoryGroup: 'private',
    tag: 'Large Group Charter',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Entire 22-seater luxury saloon coaster chartered exclusively for your private delegation, university student trip, or wedding tour group.',
    capacityText: '14 to 22 Persons',
    baggageAllowance: 'Full Cargo Bay',
    suitableFor: 'Corporate retreats, university groups & extended clan tours',
    costMultiplier: 1.8,
    fixedDailyPKR: 22000,
    iconName: 'bus',
    features: ['PA microphone & sound system', 'Under-floor luggage bays', 'Curtains & reading lamps', 'Two experienced highway pilots']
  },

  // 2. BY BUS (LUXURY TOURIST & EXPRESS BUS)
  {
    id: 'tourist-bus',
    name: 'Traver Luxury Tourist Coaster (Shared Group Tour)',
    category: 'tourist-bus',
    categoryGroup: 'bus',
    tag: 'Best Value Tourist Bus',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Saloon luxury tourist coaster with curtains, PA sound system, certified tour guide, and fellow adventurous travellers. Enjoy lowest per-person cost with high safety.',
    capacityText: 'Individual or Group Seats',
    baggageAllowance: '1 Suitcase + 1 Backpack per person',
    suitableFor: 'Solo travellers, students, couples & budget families',
    costMultiplier: 0.65,
    fixedDailyPKR: 5200,
    iconName: 'bus',
    features: ['Tour manager & guide onboard', 'Pre-arranged tea and meal stops', 'Social group camaraderie', 'Guaranteed seat reservation']
  },
  {
    id: 'public-bus',
    name: 'Intercity Express Bus (Faisal Movers / Daewoo) + Mountain Jeeps',
    category: 'public-bus',
    categoryGroup: 'bus',
    tag: 'Express Public Bus',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Travel on scheduled intercity executive/sleeper bus service from major cities to northern gateway terminals (Swat, Gilgit, Besham), followed by reserved mountain jeeps.',
    capacityText: 'Per Seat Scheduled',
    baggageAllowance: '20 kg Baggage Allowance',
    suitableFor: 'Backpackers, students & budget travellers',
    costMultiplier: 0.55,
    fixedDailyPKR: 4200,
    iconName: 'bus',
    features: ['Reclining sleeper or executive seats', 'Scheduled motorway departure', 'Terminal lounges with Wi-Fi', 'Seamless connecting jeep ticket']
  },

  // 3. LOCAL TRANSPORT & SHARED VANS
  {
    id: 'local-transport',
    name: 'Local Transport (Shared Hiace Vans & Local Jeeps)',
    category: 'local-transport',
    categoryGroup: 'local',
    tag: 'Local Backpacking',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
    description: 'Travel like an authentic local adventurer using shared Hiace transit vans from Pirwadhai/Faizabad bus stands and local shared mountain jeeps between villages. Lowest total expenditure.',
    capacityText: 'Per Seat Shared',
    baggageAllowance: '1 Rucksack / Duffel Bag',
    suitableFor: 'Trekker backpackers, students & maximum budget savers',
    costMultiplier: 0.42,
    fixedDailyPKR: 2600,
    iconName: 'bus',
    features: ['Maximum budget savings', 'Authentic local interactions', 'Flexible route hopping', 'Local roadside dhabas']
  },

  // 4. BY AIR (DOMESTIC FLIGHT)
  {
    id: 'flight',
    name: 'By Air: Commercial Domestic Flight + Local Mountain 4x4 SUV',
    category: 'flight',
    categoryGroup: 'flight',
    tag: 'Fastest (Save 20+ Driving Hours)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Direct PIA / Fly Jinnah flights from Islamabad/Karachi/Lahore to Skardu International or Gilgit Airport, met immediately upon landing by a private mountain vehicle.',
    capacityText: '1 to 10+ Persons',
    baggageAllowance: '20 kg Checked + 7 kg Cabin',
    suitableFor: 'Time-constrained executives, elderly family members & honeymooners',
    costMultiplier: 2.1,
    fixedDailyPKR: 18500,
    iconName: 'plane',
    features: ['45-min flight vs 16-hr drive', 'Breathtaking aerial views of Nanga Parbat & K2', 'Dedicated mountain SUV upon arrival', 'Airport VIP reception']
  }
];

export interface ItineraryDayDetail {
  day: number;
  title: string;
  image: string; // Specific location picture for that day
  locationName: string;
  highlights: string[];
  travelTime: string;
  foodTip: string;
  stayRecommendation: string;
}

export interface PlannerDestination {
  id: string;
  name: string;
  region: string;
  slug: string;
  coverImage: string;
  tagline: string;
  distanceFromIslamabadKm: number;
  driveTimeHours: number;
  flightAvailable: boolean;
  airportName?: string;
  bestMonths: string;
  recommendedDays: number;
  avgHotelPerNightStandard: number;
  avgHotelPerNightLuxury: number;
  avgMealPerPersonPerDay: number;
  jeepRequired: boolean;
  jeepPerDayPKR: number;
  sampleItinerary: ItineraryDayDetail[];
}

export const PLANNER_DESTINATIONS: PlannerDestination[] = [
  // ==========================================
  // 1. HUNZA VALLEY & ATTABAD LAKE
  // ==========================================
  {
    id: 'hunza',
    name: 'Hunza Valley & Attabad Lake',
    region: 'Gilgit-Baltistan',
    slug: 'magical-hunza-attabad-lake-expedition',
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Electric-blue lakes, 800-year-old Silk Road forts, and jagged Passu Cones beneath the snowy crown of Rakaposhi.',
    distanceFromIslamabadKm: 580,
    driveTimeHours: 14,
    flightAvailable: true,
    airportName: 'Gilgit Airport (45 min drive to Hunza)',
    bestMonths: 'April to October (Cherry Blossom & Golden Autumn)',
    recommendedDays: 7,
    avgHotelPerNightStandard: 9000,
    avgHotelPerNightLuxury: 28000,
    avgMealPerPersonPerDay: 2500,
    jeepRequired: false,
    jeepPerDayPKR: 0,
    sampleItinerary: [
      {
        day: 1,
        title: 'Departure & Karakoram Highway Transit',
        locationName: 'Hazara Motorway Tunnels, Babusar Pass (4,173m) & Chilas Canyon',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Cruising smooth Hazara Motorway tunnels',
          'Ascent over Babusar Top pass (4,173m in summer) with mountain panoramic views',
          'Sunset drive along the roaring Indus River canyon'
        ],
        travelTime: '8 - 10 hours scenic drive',
        foodTip: 'Fresh pan-fried river trout with hot tandoori naan at Balakot or Chilas',
        stayRecommendation: 'Chilas Shangrila or Naran Riverfront Hotel'
      },
      {
        day: 2,
        title: 'Arrival in Karimabad & Rakaposhi Viewpoint',
        locationName: 'Three Mountain Ranges Confluence & Rakaposhi Viewpoint (7,788m)',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Confluence point of 3 legendary mountain ranges: Himalaya, Karakoram, Hindu Kush',
          'Standing before the sheer 6,000m vertical snow wall of Rakaposhi peak',
          'Evening stroll through the cobblestone alleys of Karimabad Bazaar'
        ],
        travelTime: '5 - 6 hours drive',
        foodTip: 'Traditional Hunza Chapshuro (meat-stuffed pie) with organic walnut apricot cake',
        stayRecommendation: 'Darbar Hotel or Serena Inn Karimabad'
      },
      {
        day: 3,
        title: 'Baltit Fort, Altit Fort & Duikar Golden Sunset',
        locationName: 'UNESCO Baltit Fort (800 Yrs Old) & Duikar Eagle’s Nest (2,850m)',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Guided tour of 800-year-old Tibetan-inspired Baltit Fort perched over the valley',
          'Royal apricot and cherry orchards of Altit Fort and Rani Room',
          'Panoramic golden sunset over 8 prominent peaks from Duikar Eagle’s Nest'
        ],
        travelTime: 'Local valley transit (20 mins)',
        foodTip: 'Warm dried apricot soup and local herbal Tumuro mountain tea',
        stayRecommendation: 'Karimabad / Duikar Eagle’s Nest Lodges'
      },
      {
        day: 4,
        title: 'Attabad Lake Speedboating & Passu Cones',
        locationName: 'Turquoise Attabad Lake & Passu Cathedral Needles',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Speedboating and jet skiing across the electric turquoise waters of Attabad Lake',
          'Thrilling walk on the swaying Hussaini Suspension Bridge over Hunza River',
          'Iconic photography of the jagged needle-like Passu Cones cathedral'
        ],
        travelTime: '2 hours drive through KKH tunnels',
        foodTip: 'Yak meat karahi and freshly made cherry juice at Glacier Breeze café',
        stayRecommendation: 'Passu Ambassador Hotel or Gojal Sarai'
      },
      {
        day: 5,
        title: 'Khunjerab Pass (Pak-China Border: 4,693m)',
        locationName: 'Khunjerab National Park & World’s Highest Paved Border',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Standing at the official Pak-China international border gate at 4,693 meters altitude',
          'Spotting Golden Marmots and Himalayan Ibex in Khunjerab National Park',
          'Withdrawing cash from the world’s highest solar-powered ATM'
        ],
        travelTime: '3.5 hours each way from Passu',
        foodTip: 'Steaming hot chicken corn soup and noodles at Sost Dry Port market',
        stayRecommendation: 'Passu Ambassador or Karimabad'
      },
      {
        day: 6,
        title: 'Hoper Glacier & Nagar Valley',
        locationName: 'Hoper Spantik Valley & Black & White Glaciers',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Crossing into scenic Nagar Valley across the river',
          'Trek to the rim of active Hoper Glacier',
          'Sampling fresh dried mulberries and organic mountain honey'
        ],
        travelTime: '3 hours roundtrip drive',
        foodTip: 'Traditional Nagar mutton soup with freshly baked flatbread',
        stayRecommendation: 'Karimabad / Gilgit River Hotel'
      },
      {
        day: 7,
        title: 'Return Journey with River Views',
        locationName: 'Karakoram Highway & Return to Islamabad / Gateway',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Souvenir shopping for pure gemstones, pashmina shawls & dry fruits',
          'Scenic photography stops at Indus River suspension bridges',
          'Safe return arrival at Islamabad / hometown'
        ],
        travelTime: 'Return drive / 45-min flight',
        foodTip: 'Celebratory farewell Shinwari karahi dinner',
        stayRecommendation: 'Home or Islamabad'
      }
    ]
  },

  // ==========================================
  // 2. SKARDU, SHANGRILA & DEOSAI PLAINS
  // ==========================================
  {
    id: 'skardu',
    name: 'Skardu, Shangrila & Deosai Plains',
    region: 'Gilgit-Baltistan',
    slug: 'skardu-deosai-plains-land-of-giants',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Heart-shaped alpine lakes, white sand cold dunes encircled by snow, and the vast mystical Land of Giants.',
    distanceFromIslamabadKm: 630,
    driveTimeHours: 15,
    flightAvailable: true,
    airportName: 'Skardu International Airport (direct daily flights)',
    bestMonths: 'May to October',
    recommendedDays: 8,
    avgHotelPerNightStandard: 11000,
    avgHotelPerNightLuxury: 32000,
    avgMealPerPersonPerDay: 2800,
    jeepRequired: true,
    jeepPerDayPKR: 14000,
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival in Skardu Basin & Indus Gorge',
        locationName: 'Skardu Valley along the Indus River Basin',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Arrival via scenic Indus Highway or 45-min mountain flight',
          'Hotel check-in with views of dramatic Karakoram granite walls',
          'Acclimatization walk through bustling Balti bazaar and dry fruit stalls'
        ],
        travelTime: 'Full day drive or 45-min flight',
        foodTip: 'Balti Mamtu (steamed beef & mutton dumplings) with spicy crushed chili chutney',
        stayRecommendation: 'Dewanekhas / Tibet Center Skardu'
      },
      {
        day: 2,
        title: 'Shangrila Resort & Upper Kachura Lake',
        locationName: 'Shangrila Pagoda Resort & Crystal Upper Kachura Lake',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'World-renowned heart-shaped Lower Kachura Lake at Shangrila Resort',
          'Pine forest hike to pristine emerald waters of Upper Kachura Lake',
          'Wooden boating and cliff diving in ice-pure glacial waters'
        ],
        travelTime: '45 mins from Skardu town',
        foodTip: 'Freshly caught grilled Indus trout fish with lemon herb glaze',
        stayRecommendation: 'Shangrila Resort or Skardu Town'
      },
      {
        day: 3,
        title: 'Deosai National Park & Sheosar Alpine Lake (4,114m)',
        locationName: 'Deosai High Plateau (4,114m) & Sheosar Lake',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          '4x4 Off-road Jeep climb through the dramatic Ali Malik Pass',
          'Crossing Kala Pani and crystal Bara Pani rivers',
          'Standing by Sheosar Lake with a direct view of Nanga Parbat mountain in the distance'
        ],
        travelTime: 'Full day 4x4 expedition',
        foodTip: 'Hot picnic lunch, boiled eggs, and sweet Balti tea beside roaring alpine streams',
        stayRecommendation: 'Glamping at Deosai or Skardu Hotel'
      },
      {
        day: 4,
        title: 'Shigar Valley & Serena Shigar Fort (Fong-Khar)',
        locationName: '17th-Century Shigar Fort & Jarba Xho (Blind Lake)',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Tour of the restored 400-year-old Raja Palace in Shigar',
          'Spiritual visit to the 14th-century wooden carved Amburiq Mosque',
          'Walking through Shigar organic walnut and apple groves'
        ],
        travelTime: '1 hour scenic drive',
        foodTip: 'Apricot-oil roasted chicken with Balti flatbread',
        stayRecommendation: 'Serena Shigar Fort / Space Hotel Shigar'
      },
      {
        day: 5,
        title: 'Katpana Cold Desert & Kharpocho Fort Summit',
        locationName: 'Katpana White Sand Dunes & Ancient Kharpocho Fort',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Walking on white sand dunes surrounded by snowy mountain peaks',
          'Sunset camel ride or high-thrill quad biking on desert dunes',
          'Panoramic cliffside view of Skardu valley from historic Kharpocho Fort'
        ],
        travelTime: '30 mins local drive',
        foodTip: 'Balti Prappu (traditional handmade buckwheat noodles in almond herb gravy)',
        stayRecommendation: 'Dewanekhas Skardu / Glamping Dunes'
      },
      {
        day: 6,
        title: 'Manthokha Waterfall & Khaplu Palace',
        locationName: '180-Foot Manthokha Waterfall & Yabgo Raja Khaplu Palace',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Standing before the majestic 180-foot cascading Manthokha Waterfall',
          'Exploring Serena Khaplu Palace with Tibetan and Kashmiri architectural woodwork',
          'Trout fish farms in Khaplu along the Shyok River'
        ],
        travelTime: '2.5 hours scenic drive along Shyok River',
        foodTip: 'Special Khaplu walnut halwa and butter tea',
        stayRecommendation: 'Serena Khaplu Palace or Skardu'
      },
      {
        day: 7,
        title: 'Sarfaranga Cold Desert Quad Biking & Return Transit',
        locationName: 'Sarfaranga Cold Desert Dunes & Departure Preparations',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Thrilling 4x4 offroad and ATV quad biking on Sarfaranga dunes',
          'Shopping for authentic Baltistan shilajit, organic dry fruits & gems',
          'Celebratory farewell dinner under the Karakoram stars'
        ],
        travelTime: 'Local exploration & packing',
        foodTip: 'Baltistan lamb shank pulao with wild mountain mint chutney',
        stayRecommendation: 'Skardu Hotel'
      }
    ]
  },

  // ==========================================
  // 3. FAIRY MEADOWS & NANGA PARBAT
  // ==========================================
  {
    id: 'fairy-meadows',
    name: 'Fairy Meadows & Nanga Parbat',
    region: 'Gilgit-Baltistan',
    slug: 'fairy-meadows-nanga-parbat-base-camp-trek',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Thrilling offroad cliffside jeeps, pine forest trails, and front-row view of the 8,126m Killer Mountain.',
    distanceFromIslamabadKm: 480,
    driveTimeHours: 12,
    flightAvailable: true,
    airportName: 'Gilgit Airport (2.5 hr drive to Raikot Bridge)',
    bestMonths: 'June to September',
    recommendedDays: 6,
    avgHotelPerNightStandard: 7500,
    avgHotelPerNightLuxury: 18000,
    avgMealPerPersonPerDay: 2200,
    jeepRequired: true,
    jeepPerDayPKR: 16000,
    sampleItinerary: [
      {
        day: 1,
        title: 'Islamabad to Chilas via Hazara Motorway',
        locationName: 'Hazara Motorway, Thakot Bridge & Indus River Canyon',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Smooth expressway drive through Mansehra & Battagram',
          'Following the mighty Indus River gorge along KKH',
          'Rest in Chilas before the mountain trek'
        ],
        travelTime: '9 - 11 hours drive',
        foodTip: 'Shinaki mutton karahi with mint raita',
        stayRecommendation: 'Grace Continental Hotel Chilas'
      },
      {
        day: 2,
        title: 'Raikot Bridge, 4x4 Mountain Jeep & Hike to Meadows',
        locationName: 'Raikot Jeep Track, Tattu Village & Fairy Meadows (3,300m)',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'World-famous thrilling 4x4 mountain jeep ride carved into sheer canyon cliffs to Tattu',
          '3-hour scenic hike through alpine pine and birch forests',
          'First jaw-dropping front-row view of the 8,126m Raikot Face of Nanga Parbat'
        ],
        travelTime: '2 hours jeep + 3.5 hours trek',
        foodTip: 'Hot daal, rice, and freshly baked mountain roti by the campfire',
        stayRecommendation: 'Fairy Meadows Wooden Cottages'
      },
      {
        day: 3,
        title: 'Trek to Beyal Camp & Raikot Glacier Ice Wall',
        locationName: 'Beyal Camp (3,500m) & Raikot Glacier Ridge',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Gentle trail through fragrant pine woods to tranquil Beyal Camp',
          'Standing before the roaring Raikot Glacier ice wall',
          'Spotting Golden Marmots playing on green slopes'
        ],
        travelTime: '4 - 5 hours roundtrip walk',
        foodTip: 'Hot Maggi noodles and cardamom green tea at Beyal wooden teahouse',
        stayRecommendation: 'Fairy Meadows Wooden Cottages'
      },
      {
        day: 4,
        title: 'German Base Camp Viewpoint & Reflection Pools',
        locationName: 'Nanga Parbat German Viewpoint (3,967m) & Reflection Pools',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Advancing to the German Base Camp viewpoint where the sheer ice summit looms overhead',
          'Photographing mirror reflections of Nanga Parbat in alpine tarns',
          'Crackling cedar wood bonfire and Milky Way stargazing'
        ],
        travelTime: '5 hours roundtrip trek',
        foodTip: 'Barbecue chicken skewers under the starlit sky',
        stayRecommendation: 'Fairy Meadows Cottages'
      },
      {
        day: 5,
        title: 'Descent to Tattu, Return Jeep & Transit',
        locationName: 'Fairy Meadows Trail, Tattu Village & Chilas / Besham',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Morning mountain sunrise over Nanga Parbat',
          'Downhill trek to Tattu village',
          'Return mountain jeep ride to Raikot Bridge and highway transit'
        ],
        travelTime: '2.5 hrs walk + 1.5 hrs jeep + 4 hrs drive',
        foodTip: 'Tender Shinwari mutton tikka with fresh tandoori naan',
        stayRecommendation: 'Besham Hilton or Chilas'
      }
    ]
  },

  // ==========================================
  // 4. SWAT VALLEY, KALAM & MALAM JABBA
  // ==========================================
  {
    id: 'swat',
    name: 'Swat Valley, Kalam & Malam Jabba',
    region: 'Khyber Pakhtunkhwa',
    slug: 'swat-emerald-valley-malam-jabba-ski-resort',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Switzerland of the East: emerald hills, alpine chairlifts, roaring Swat River, and glacial Mahodand Lake.',
    distanceFromIslamabadKm: 245,
    driveTimeHours: 4.5,
    flightAvailable: false,
    airportName: 'Drive via Swat Express Motorway (under 4 hours)',
    bestMonths: 'Year-Round (Winter Skiing & Summer Alpine Meadows)',
    recommendedDays: 5,
    avgHotelPerNightStandard: 7000,
    avgHotelPerNightLuxury: 22000,
    avgMealPerPersonPerDay: 2000,
    jeepRequired: true,
    jeepPerDayPKR: 9000,
    sampleItinerary: [
      {
        day: 1,
        title: 'Islamabad to Mingora & White Palace Marghuzar',
        locationName: 'Swat Express Motorway, Mingora & White Marble Palace (Sufaid Mahal)',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Smooth transit through Swat Expressway mountain tunnels',
          'Visiting the 1940s White Palace built with pure white marble for the Wali of Swat',
          'Shopping in Mingora for Swati embroidery, woolen shawls and emerald jewelry'
        ],
        travelTime: '3.5 - 4 hours drive',
        foodTip: 'Famous Swati Chapli Kababs and mutton Shinwari tikka in Mingora',
        stayRecommendation: 'Serena Swat Hotel or Rock City Resort'
      },
      {
        day: 2,
        title: 'Malam Jabba Alpine Ski Resort & 2,800m Chairlift',
        locationName: 'Malam Jabba Hill Station (2,800m) & Chairlift',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Riding the high alpine chairlift with panoramic views of snow-capped Hindu Raj peaks',
          'Alpine zipline and mountain rollercoaster thrill rides',
          'Snow sports, skiing in winter, and pine hiking in summer'
        ],
        travelTime: '1.5 hours drive from Mingora',
        foodTip: 'Piping hot chicken corn soup and walnut halwa at the summit café',
        stayRecommendation: 'Pearl Continental Malam Jabba or Mingora'
      },
      {
        day: 3,
        title: 'Journey to Upper Swat & Kalam Pine Valley',
        locationName: 'Bahrain Wooden Bazaar & Kalam Valley Pine Canopies',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Following the rushing Swat River through scenic canyons',
          'Stop at Bahrain wooden handicraft bazaar and riverside waterfalls',
          'Checking into riverside lodges surrounded by towering deodar pine forests in Kalam'
        ],
        travelTime: '3 hours scenic mountain drive',
        foodTip: 'Fresh pan-fried Swat River trout fish with lemon butter sauce',
        stayRecommendation: 'Walnut Heights or Greens Hotel Kalam'
      },
      {
        day: 4,
        title: '4x4 Offroad to Mahodand Lake & Ancient Ushu Forest',
        locationName: 'Ancient Ushu Pine Forest, Matiltan Waterfall & Turquoise Mahodand Lake',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Driving through century-old mossy deodar trees of Ushu Forest',
          'Cascading roaring glacial falls at Matiltan and Mighty 22 Falls',
          'Boating and horseback riding around the turquoise glacial basin of Mahodand Lake'
        ],
        travelTime: 'Full day 4x4 mountain jeep trip',
        foodTip: 'Riverside fresh trout fry and tandoori chapati at Mahodand tents',
        stayRecommendation: 'Greens Hotel Kalam'
      },
      {
        day: 5,
        title: 'Kalam Forest Walk & Return Drive',
        locationName: 'Kalam Valley & Return via Swat Express Motorway',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Crisp morning walk through Kalam pine woods',
          'Stop at Madyan trout fish hatcheries',
          'Fast motorway return drive to Islamabad'
        ],
        travelTime: '5.5 hours drive',
        foodTip: 'Special Swati honey and hot parathas',
        stayRecommendation: 'Home or Islamabad'
      }
    ]
  },

  // ==========================================
  // 5. KUMRAT VALLEY & JAHAZ BANDA
  // ==========================================
  {
    id: 'kumrat',
    name: 'Kumrat Valley & Jahaz Banda Alpine Meadows',
    region: 'Khyber Pakhtunkhwa',
    slug: 'kumrat-valley-jahaz-banda-alpine-trek',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Untouched wilderness, towering deodar tree canopies, roaring Panjkora river, and the bowl of Katora Lake.',
    distanceFromIslamabadKm: 370,
    driveTimeHours: 8.5,
    flightAvailable: false,
    bestMonths: 'June to September',
    recommendedDays: 5,
    avgHotelPerNightStandard: 6500,
    avgHotelPerNightLuxury: 16000,
    avgMealPerPersonPerDay: 1800,
    jeepRequired: true,
    jeepPerDayPKR: 10000,
    sampleItinerary: [
      {
        day: 1,
        title: 'Islamabad to Upper Dir & Thal Village',
        locationName: 'Thal 19th-Century Wood Carved Mosque & Panjkora River',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Swat Motorway & Lowari approach drive',
          'Visiting the 150-year-old carved wooden mosque in Thal',
          'Riverside camping gateway along the rushing Panjkora River'
        ],
        travelTime: '7 - 8 hours drive',
        foodTip: 'Kohistani goat karahi and steaming green tea',
        stayRecommendation: 'Kumrat Valley River Camps / Panjkora Glamping'
      },
      {
        day: 2,
        title: 'Kumrat Deep Forest & Kala Chashma',
        locationName: 'Kumrat Forest Canopy, Kala Chashma Spring & Do Janga',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Dense deodar forest canopy walk with moss-covered trails',
          'Kala Chashma (Black Spring) roaring waterfall',
          'Do Janga confluence of two glacial rivers'
        ],
        travelTime: 'Full day 4x4 offroad exploration',
        foodTip: 'Campfire barbecue under tall pine trees',
        stayRecommendation: 'Kumrat Alpine Resort or Luxury Tents'
      },
      {
        day: 3,
        title: '4x4 to Jaki Banda & Hike to Jahaz Banda High Meadows (3,100m)',
        locationName: 'Jahaz Banda Alpine Pastures (3,100m)',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Thrilling 4x4 jeep trail to Jaki Banda base',
          '3-hour hike through alpine wild flower meadows',
          'Panoramic views of jagged snow-dusted Kohistan peaks'
        ],
        travelTime: '2 hours jeep + 3 hours trek',
        foodTip: 'Warm porridge and hot chai at high shepherd hut',
        stayRecommendation: 'Jahaz Banda Wooden Huts'
      },
      {
        day: 4,
        title: 'Trek to Katora Glacial Bowl Lake (3,500m)',
        locationName: 'Katora Glacial Bowl Lake (Emerald Basin)',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Trek to the natural emerald amphitheater of Katora Lake bowl',
          'Giant hanging glacier reflections in mirror-calm water',
          'Evening descent back to Jahaz Banda meadows'
        ],
        travelTime: '4 hours roundtrip hike',
        foodTip: 'Pack trail mix, nuts, and hot noodles by the lake',
        stayRecommendation: 'Jahaz Banda Wooden Huts'
      },
      {
        day: 5,
        title: 'Descent & Return Journey',
        locationName: 'Descent to Thal & Motorway Return Transit',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Morning sunrise above mist-covered valleys',
          'Return descent to Thal village',
          'Highway drive back to Islamabad'
        ],
        travelTime: '8 hours transit',
        foodTip: 'Hot chapli kababs at Timergara',
        stayRecommendation: 'Home or Islamabad'
      }
    ]
  },

  // ==========================================
  // 6. NEELUM VALLEY, SHARDA & ARANG KEL
  // ==========================================
  {
    id: 'neelum',
    name: 'Neelum Valley, Sharda & Arang Kel',
    region: 'Azad Kashmir',
    slug: 'neelum-valley-arang-kel-kashmir-escape',
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Paradise on earth: roaring azure rivers, thousand-year-old Buddhist university ruins, and cable cars above clouds.',
    distanceFromIslamabadKm: 210,
    driveTimeHours: 6.5,
    flightAvailable: false,
    airportName: 'Drive from Islamabad via Murree Expressway',
    bestMonths: 'May to October',
    recommendedDays: 5,
    avgHotelPerNightStandard: 7500,
    avgHotelPerNightLuxury: 19000,
    avgMealPerPersonPerDay: 2000,
    jeepRequired: true,
    jeepPerDayPKR: 8500,
    sampleItinerary: [
      {
        day: 1,
        title: 'Islamabad to Muzaffarabad & Kutton Waterfall',
        locationName: 'Murree Expressway, Kohala Bridge & Kutton Cascades (Jagran Valley)',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Murree expressway transit into Kashmir mountains',
          'Kutton cascading waterfall in lush Jagran Valley',
          'Suspension bridges over the azure Neelum River'
        ],
        travelTime: '5 - 6 hours drive',
        foodTip: 'Kashmiri Gushtaba & Roghan Josh with saffron rice',
        stayRecommendation: 'Kutton Jagran Resort'
      },
      {
        day: 2,
        title: 'Keran Riverfront & Sharda Peeth Ancient Ruins',
        locationName: 'Keran LOC Viewpoint & 1,000-Year-Old Sharda Peeth Temple',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Keran riverfront view of Indian-administered Kashmir villages',
          '1,000-year-old carved stone temple ruins of Sharda Peeth university',
          'Traditional wooden architecture of Sharda village'
        ],
        travelTime: '3.5 hours drive',
        foodTip: 'Pink Kashmiri Noon Chai with crisp bakarkhani biscuits',
        stayRecommendation: 'Wadi Resort Sharda'
      },
      {
        day: 3,
        title: 'Kel Town & Cable Car Dolly to Arang Kel Meadow',
        locationName: 'Kel River Gorge Cable Car & Storybook Arang Kel Meadows',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Thrilling chairlift dolly crossing high over the deep river canyon',
          'Gentle hike to the storybook pasture of Arang Kel',
          'Panoramic views of lush green meadows surrounded by snowy mountain walls'
        ],
        travelTime: '2 hours drive + cable car + 30 min hike',
        foodTip: 'Fresh mountain goat milk chai and hearty chicken handi',
        stayRecommendation: 'Arang Kel Wooden Lodges (Stay above the clouds)'
      },
      {
        day: 4,
        title: 'Taobat: The Fairytale Last Village of Neelum River',
        locationName: 'Taobat Fairytale Meadows & Halmat Riverfront',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          '4x4 Jeep ride to Taobat, the final border village in Neelum Valley',
          'Gagai stream confluence and emerald green rolling farm hills',
          'Peaceful wooden houses nestled beside crystal clear water'
        ],
        travelTime: '3.5 hours jeep ride',
        foodTip: 'Riverside fresh trout fry and Kashmiri Pulao',
        stayRecommendation: 'Green Village Resort Keran or Sharda'
      },
      {
        day: 5,
        title: 'Dhani Waterfall & Return Journey',
        locationName: 'Dhani Roaring Cascades & Return to Islamabad',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Stop at high gushing Dhani Waterfall on Neelum Highway',
          'Kashmiri wooden handicraft and souvenir shopping in Muzaffarabad',
          'Comfortable evening return to Islamabad'
        ],
        travelTime: '6 hours return drive',
        foodTip: 'Hot Kashmiri Kulcha and tea in Muzaffarabad',
        stayRecommendation: 'Home or Islamabad'
      }
    ]
  },

  // ==========================================
  // 7. NARAN KAGHAN & LAKE SAIFUL MALOOK
  // ==========================================
  {
    id: 'naran',
    name: 'Naran Kaghan, Lake Saiful Malook & Babusar Pass',
    region: 'Khyber Pakhtunkhwa',
    slug: 'naran-kaghan-valley-saiful-malook-tour',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Fairy-tale glacial lake beneath Malika Parbat, gushing Kunhar River, Lulusar Lake, and high alpine meadows of Shogran.',
    distanceFromIslamabadKm: 275,
    driveTimeHours: 6.0,
    flightAvailable: false,
    airportName: 'Drive via Hazara Motorway & Balakot',
    bestMonths: 'May to October',
    recommendedDays: 4,
    avgHotelPerNightStandard: 8000,
    avgHotelPerNightLuxury: 22000,
    avgMealPerPersonPerDay: 2200,
    jeepRequired: true,
    jeepPerDayPKR: 8000,
    sampleItinerary: [
      {
        day: 1,
        title: 'Islamabad to Naran via Balakot & Kiwai Waterfall',
        locationName: 'Hazara Motorway, Kiwai Cascades & Kunhar River Valley',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Drive along the rushing Kunhar River',
          'Tea and pakora break on wooden tables sitting right inside Kiwai waterfall stream',
          'Evening walk through lively Naran Bazaar with grilled corn and dry fruits'
        ],
        travelTime: '5.5 - 6 hours drive',
        foodTip: 'Fresh pan-fried Kunhar River trout with lemon herb seasoning',
        stayRecommendation: 'Millennium Inn or Pine Top Hotel Naran'
      },
      {
        day: 2,
        title: '4x4 Jeep to Fairy-Tale Lake Saiful Malook (3,224m)',
        locationName: 'Legendary Lake Saiful Malook & Malika Parbat Summit',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Thrilling 4x4 mountain jeep climb on rugged winding mountain trail',
          'Mirror turquoise reflection of the 5,290m Malika Parbat peak',
          'Boating on the legendary fairy lake and horse riding along shores'
        ],
        travelTime: '45 mins jeep each way',
        foodTip: 'Steaming hot chicken biryani and Kashmiri chai at the lake teahouse',
        stayRecommendation: 'Naran Riverfront Hotel'
      },
      {
        day: 3,
        title: 'Lulusar Glacial Lake & Babusar Top Summit (4,173m)',
        locationName: 'Lulusar Lake Mirror Waters & Babusar Pass (4,173m)',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Passing the pristine crescent-shaped Lulusar Lake surrounded by wildflowers',
          'Ascent to the highest point of Kaghan Valley at Babusar Top (4,173m)',
          'Standing on the boundary of KPK and Gilgit-Baltistan with 360-degree snow views'
        ],
        travelTime: '2 hours drive each way from Naran',
        foodTip: 'Hot Maggi noodles, boiled eggs, and Kashmiri pink tea at the windy summit',
        stayRecommendation: 'Naran or Shogran Hilltop Resort'
      },
      {
        day: 4,
        title: 'Shogran Pine Plateau, Siri Paye Meadows & Return',
        locationName: 'Shogran Pine Plateau & Siri Paye High Alpine Meadows',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          '4x4 jeep ride through dense pine forest up to Shogran plateau',
          'Horse riding on high emerald slopes of Siri Paye under Makra Peak',
          'Smooth evening motorway drive back to Islamabad'
        ],
        travelTime: 'Jeep ride + 4.5 hours return drive',
        foodTip: 'Barbecue chicken tikka at Kiwai',
        stayRecommendation: 'Home or Islamabad'
      }
    ]
  },

  // ==========================================
  // 8. GWADAR & MAKRAN COASTAL HIGHWAY
  // ==========================================
  {
    id: 'gwadar',
    name: 'Gwadar & Hingol Makran Coastal Circuit',
    region: 'Balochistan',
    slug: 'gwadar-makran-coastal-highway-odyssey',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tagline: 'World-renowned scenic coastal highway, natural rock sphinxes, Princess of Hope, and pristine blue Arabian Sea beaches.',
    distanceFromIslamabadKm: 1400,
    driveTimeHours: 20,
    flightAvailable: true,
    airportName: 'Gwadar International Airport (or drive 8 hrs from Karachi)',
    bestMonths: 'November to March (Pleasant Sunny Winter)',
    recommendedDays: 4,
    avgHotelPerNightStandard: 8500,
    avgHotelPerNightLuxury: 24000,
    avgMealPerPersonPerDay: 2500,
    jeepRequired: false,
    jeepPerDayPKR: 0,
    sampleItinerary: [
      {
        day: 1,
        title: 'Karachi to Hingol National Park via Coastal Highway (N-10)',
        locationName: 'Makran Coastal Highway, Princess of Hope & Balochistan Sphinx',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Cruising the dramatic Makran Coastal Highway along the Arabian Sea',
          'Naturally wind-carved Princess of Hope rock monument',
          'The majestic Sphinx of Balochistan & surreal active mud volcanoes'
        ],
        travelTime: '4.5 hours drive from Karachi',
        foodTip: 'Fresh Arabian Sea pomfret fish with authentic Balochi sajji',
        stayRecommendation: 'Ormara Beach Resort or Gwadar'
      },
      {
        day: 2,
        title: 'Ormara Turtle Beach to Gwadar Hammerhead',
        locationName: 'Ormara Beach & Buzi Pass Geological Formations',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Crystal turquoise waters of Ormara Beach',
          'Driving through the surreal canyon walls of Buzi Pass',
          'Arrival at the Gwadar Port bay and sunset along Marine Drive'
        ],
        travelTime: '4 hours highway drive',
        foodTip: 'Balochi dumped mutton cooked slowly in its own natural fat',
        stayRecommendation: 'Pearl Continental Gwadar (Koh-e-Batil cliff)'
      },
      {
        day: 3,
        title: 'Koh-e-Batil Summit & Sunset Marine Drive',
        locationName: 'Koh-e-Batil Cliff (600 Steps) & Crescent Bays',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Climb the famous 600 steps of Koh-e-Batil hammerhead cliff',
          'Panoramic view of dual crescent bays and Gwadar deep sea port',
          'Boat cruise with local fishermen to Astola Island waters'
        ],
        travelTime: 'Local coastal exploration',
        foodTip: 'Grilled jumbo prawns and lobster at Gwadar seafood harbour',
        stayRecommendation: 'Pearl Continental Gwadar'
      },
      {
        day: 4,
        title: 'Gwadar Old Fish Market, Omani Fort & Return',
        locationName: 'Gwadar Heritage Fish Harbor & Makran Return Highway',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        highlights: [
          'Visiting traditional hand-crafted wooden dhow shipyards',
          'Historic 17th-century Omani Fort ruins',
          'Return flight or scenic return highway transit'
        ],
        travelTime: 'Return flight / Highway transit',
        foodTip: 'Balochi halwa and fresh seafood curry',
        stayRecommendation: 'Home or Karachi'
      }
    ]
  }
];

export interface CostEstimateResult {
  originName: string;
  originProvince: string;
  destinationName: string;
  vehicleFacility: VehicleFacility;
  totalDistanceKm: number;
  oneWayHours: number;
  partySize: number;
  days: number;
  nights: number;
  travelStyle: 'Standard' | 'Luxury' | 'Budget';
  costs: {
    transportFuelPKR: number;
    flightTicketsPKR: number;
    accommodationPKR: number;
    mealsPKR: number;
    mountainJeepsPKR: number;
    activityFeesPKR: number;
    totalPKR: number;
    perPersonPKR: number;
  };
}

export function calculateTripCost(
  originId: string,
  destinationId: string,
  vehicleFacilityId: string,
  days: number,
  partySize: number,
  travelStyle: 'Standard' | 'Luxury' | 'Budget'
): CostEstimateResult {
  const origin = ORIGIN_CITIES.find(o => o.id === originId) || ORIGIN_CITIES[0];
  const dest = PLANNER_DESTINATIONS.find(d => d.id === destinationId) || PLANNER_DESTINATIONS[0];
  const vehicle = VEHICLE_FACILITIES.find(v => v.id === vehicleFacilityId) || VEHICLE_FACILITIES[0];
  const nights = Math.max(1, days - 1);

  const oneWayDistanceKm = dest.distanceFromIslamabadKm + origin.distanceToCapitalKm;
  const roundTripDistanceKm = oneWayDistanceKm * 2;
  const totalTravelHours = dest.driveTimeHours + origin.extraDriveHoursToCapital;

  let transportFuelPKR = 0;
  let flightTicketsPKR = 0;

  if (vehicle.category === 'flight') {
    const flightTicketOnePerson = (origin.baseFlightFeeToCapital || 0) + 38000;
    flightTicketsPKR = flightTicketOnePerson * partySize;
    // Local SUV rental at destination
    transportFuelPKR = days * (travelStyle === 'Luxury' ? 14000 : 9000);
  } else if (vehicle.category === 'tourist-bus' || vehicle.category === 'public-bus' || vehicle.category === 'local-transport') {
    // Shared bus / local rate per seat
    const baseSeatRate = roundTripDistanceKm * (vehicle.category === 'tourist-bus' ? 14 : vehicle.category === 'public-bus' ? 11 : 8);
    transportFuelPKR = (baseSeatRate * partySize) + (days * vehicle.fixedDailyPKR);
  } else {
    // Private Dedicated vehicles (Prado, Car, Hiace, Coaster)
    const kmRate = vehicle.id === 'private-prado' ? 44 : vehicle.id === 'private-hiace' ? 36 : vehicle.id === 'private-coaster' ? 52 : 28;
    transportFuelPKR = (roundTripDistanceKm * kmRate) + (days * vehicle.fixedDailyPKR * 0.4);
  }

  // Accommodation
  const hotelRatePerNight = travelStyle === 'Luxury'
    ? dest.avgHotelPerNightLuxury
    : travelStyle === 'Budget'
    ? dest.avgHotelPerNightStandard * 0.65
    : dest.avgHotelPerNightStandard;

  const roomsNeeded = Math.ceil(partySize / 2);
  const accommodationPKR = nights * hotelRatePerNight * roomsNeeded;

  // Meals
  const mealMultiplier = travelStyle === 'Luxury' ? 1.5 : travelStyle === 'Budget' ? 0.75 : 1.0;
  const mealsPKR = days * dest.avgMealPerPersonPerDay * mealMultiplier * partySize;

  // Mountain 4x4 Jeeps if required
  let mountainJeepsPKR = 0;
  if (dest.jeepRequired) {
    const jeepDays = Math.min(days, 2);
    const jeepsNeeded = Math.ceil(partySize / 6);
    mountainJeepsPKR = jeepDays * dest.jeepPerDayPKR * jeepsNeeded;
  }

  // Activity passes
  const activityFeesPKR = partySize * (days * 900);

  const totalPKR = Math.round(transportFuelPKR + flightTicketsPKR + accommodationPKR + mealsPKR + mountainJeepsPKR + activityFeesPKR);
  const perPersonPKR = Math.round(totalPKR / partySize);

  return {
    originName: origin.name,
    originProvince: origin.province,
    destinationName: dest.name,
    vehicleFacility: vehicle,
    totalDistanceKm: oneWayDistanceKm,
    oneWayHours: Math.round(totalTravelHours),
    partySize,
    days,
    nights,
    travelStyle,
    costs: {
      transportFuelPKR: Math.round(transportFuelPKR),
      flightTicketsPKR: Math.round(flightTicketsPKR),
      accommodationPKR: Math.round(accommodationPKR),
      mealsPKR: Math.round(mealsPKR),
      mountainJeepsPKR: Math.round(mountainJeepsPKR),
      activityFeesPKR: Math.round(activityFeesPKR),
      totalPKR,
      perPersonPKR
    }
  };
}

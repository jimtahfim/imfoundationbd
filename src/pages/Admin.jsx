import React, { useMemo, useState } from 'react';
import { CheckCircle2, FileClock, GitBranch, Loader2, Lock, Plus, RefreshCcw, Save, Trash2, X } from 'lucide-react';
import activitiesData from '../data/activities.json';
import categoryBeneficiariesData from '../data/categoryBeneficiaries.json';
import donationFundsData from '../data/donationFunds.json';
import galleryData from '../data/gallery.json';
import siteSettingsData from '../data/siteSettings.json';
import statsData from '../data/stats.json';
import supportOptionsData from '../data/supportOptions.json';
import { toBanglaNumber } from '../utils/categoryTree';
import './Admin.css';

const jsonFiles = [
  { label: 'Site settings', path: 'src/data/siteSettings.json', data: siteSettingsData },
  { label: 'Activity beneficiary counts', path: 'src/data/categoryBeneficiaries.json', data: categoryBeneficiariesData },
  { label: 'Activities', path: 'src/data/activities.json', data: activitiesData },
  { label: 'Gallery', path: 'src/data/gallery.json', data: galleryData },
  { label: 'Donation funds', path: 'src/data/donationFunds.json', data: donationFundsData },
  { label: 'Stats', path: 'src/data/stats.json', data: statsData },
  { label: 'Support options', path: 'src/data/supportOptions.json', data: supportOptionsData },
];

const fieldLabels = {
  id: 'ID',
  title: 'Title',
  name_bn: 'Bangla name',
  slug: 'Slug',
  summary: 'Summary',
  description: 'Description',
  caption: 'Caption',
  image: 'Image path',
  url: 'URL',
  videoUrl: 'Video URL',
  icon: 'Icon name',
  value: 'Number',
  label: 'Label',
  category: 'Category',
  beneficiaries: 'Beneficiary count',
  site: 'Site',
  locale: 'Locale',
  schema_version: 'Schema version',
  siteName: 'Site name',
  tagline: 'Tagline',
  phone: 'Phone',
  whatsapp: 'WhatsApp',
  email: 'Email',
  address: 'Address',
  workingHours: 'Working hours',
  facebook: 'Facebook',
  youtube: 'YouTube',
  twitter: 'Twitter',
  telegram: 'Telegram',
  isPrimary: 'Primary item',
  contact: 'Contact',
  socialUrls: 'Social links',
  overallVideos: 'Videos',
  categories: 'Categories',
  children: 'Subcategories',
};

const parseRepo = (repoValue) => {
  if (!repoValue) return null;

  const trimmed = repoValue.trim();
  const githubUrlMatch = trimmed.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (githubUrlMatch) {
    return { owner: githubUrlMatch[1], repo: githubUrlMatch[2].replace(/\.git$/, '') };
  }

  const shorthandMatch = trimmed.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (shorthandMatch) {
    return { owner: shorthandMatch[1], repo: shorthandMatch[2].replace(/\.git$/, '') };
  }

  return null;
};

const encodeBase64 = (value) => btoa(unescape(encodeURIComponent(value)));
const decodeBase64 = (value) => decodeURIComponent(escape(atob(value.replace(/\n/g, ''))));
const cloneData = (value) => JSON.parse(JSON.stringify(value));
const DRAFT_STORAGE_KEY = 'imf-admin-draft';
const getLabel = (key) => fieldLabels[key] || key.replace(/[_-]/g, ' ');
const isPlainObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const getIn = (source, path) => path.reduce((current, key) => current?.[key], source);

const setIn = (source, path, value) => {
  if (path.length === 0) return value;

  const next = cloneData(source);
  let cursor = next;

  path.slice(0, -1).forEach((key) => {
    cursor = cursor[key];
  });

  cursor[path[path.length - 1]] = value;
  return next;
};

const removeAt = (source, path, index) => {
  const list = getIn(source, path) || [];
  return setIn(source, path, list.filter((_, itemIndex) => itemIndex !== index));
};

const getEmptyFromTemplate = (template) => {
  if (Array.isArray(template)) return [];
  if (typeof template === 'number') return 0;
  if (typeof template === 'boolean') return false;
  if (isPlainObject(template)) {
    return Object.fromEntries(
      Object.entries(template).map(([key, value]) => [key, key === 'children' ? [] : getEmptyFromTemplate(value)]),
    );
  }
  return '';
};

const getItemTitle = (item, index) => {
  if (isPlainObject(item)) {
    return item.title || item.name_bn || item.label || item.caption || item.id || `Item ${index + 1}`;
  }

  return `Item ${index + 1}`;
};

const getDashboardStats = (dataByPath) => {
  const beneficiaries = dataByPath['src/data/categoryBeneficiaries.json'] || [];
  const gallery = dataByPath['src/data/gallery.json'] || [];
  const donationFunds = dataByPath['src/data/donationFunds.json'] || [];
  const supportOptions = dataByPath['src/data/supportOptions.json'] || [];
  const stats = dataByPath['src/data/stats.json'] || [];
  const totalBeneficiaries = beneficiaries.reduce((total, item) => total + Number(item.beneficiaries || 0), 0);
  const maxBeneficiaries = Math.max(...beneficiaries.map((item) => Number(item.beneficiaries || 0)), 1);

  return {
    totalBeneficiaries,
    galleryCount: gallery.length,
    donationFundCount: donationFunds.length,
    supportOptionCount: supportOptions.length,
    statsCount: stats.length,
    beneficiaries,
    maxBeneficiaries,
  };
};

const flattenData = (value, prefix = '') => {
  if (Array.isArray(value)) {
    return value.reduce((items, item, index) => ({
      ...items,
      ...flattenData(item, `${prefix}[${index}]`),
    }), {});
  }

  if (isPlainObject(value)) {
    return Object.entries(value).reduce((items, [key, item]) => ({
      ...items,
      ...flattenData(item, prefix ? `${prefix}.${key}` : key),
    }), {});
  }

  return { [prefix || 'value']: value };
};

const getChangedFields = (before, after) => {
  const previous = flattenData(before);
  const current = flattenData(after);
  const keys = [...new Set([...Object.keys(previous), ...Object.keys(current)])];

  return keys
    .filter((key) => JSON.stringify(previous[key]) !== JSON.stringify(current[key]))
    .map((key) => ({
      key,
      before: previous[key],
      after: current[key],
    }));
};

const Admin = () => {
  const repoConfig = import.meta.env.VITE_GITHUB_REPO || '';
  const repoInfo = useMemo(() => parseRepo(repoConfig), [repoConfig]);
  const [token, setToken] = useState('');
  const [selectedPath, setSelectedPath] = useState(jsonFiles[0].path);
  const [dataByPath, setDataByPath] = useState(() => (
    Object.fromEntries(jsonFiles.map((file) => [file.path, cloneData(file.data)]))
  ));
  const [baselineByPath, setBaselineByPath] = useState(() => (
    Object.fromEntries(jsonFiles.map((file) => [file.path, cloneData(file.data)]))
  ));
  const [shaByPath, setShaByPath] = useState({});
  const [branch, setBranch] = useState('');
  const [status, setStatus] = useState({ type: 'info', message: 'GitHub PAT দিয়ে লগইন করুন।' });
  const [isBusy, setIsBusy] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingChanges, setPendingChanges] = useState([]);

  const selectedFile = jsonFiles.find((file) => file.path === selectedPath);
  const selectedData = dataByPath[selectedPath];
  const isReady = Boolean(repoInfo && token);
  const dashboardStats = getDashboardStats(dataByPath);
  const hasDraft = typeof window !== 'undefined' && Boolean(localStorage.getItem(DRAFT_STORAGE_KEY));

  const updateSelectedData = (updater) => {
    setDataByPath((current) => ({
      ...current,
      [selectedPath]: typeof updater === 'function' ? updater(current[selectedPath]) : updater,
    }));
  };

  const updateField = (path, value) => {
    updateSelectedData((currentData) => setIn(currentData, path, value));
  };

  const removeListItem = (path, index) => {
    updateSelectedData((currentData) => removeAt(currentData, path, index));
  };

  const addListItem = (path) => {
    updateSelectedData((currentData) => {
      const list = getIn(currentData, path) || [];
      const template = list[0] || { id: '', title: '', description: '', url: '' };
      return setIn(currentData, path, [...list, getEmptyFromTemplate(template)]);
    });
  };

  const githubRequest = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.headers || {}),
      },
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'GitHub request failed.');
    }

    return data;
  };

  const fetchGithubData = async () => {
    const repo = await githubRequest(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
    const targetBranch = branch || repo.default_branch;
    const nextData = {};
    const nextSha = {};

    for (const file of jsonFiles) {
      const fileData = await githubRequest(
        `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/${file.path}?ref=${targetBranch}`,
      );
      nextData[file.path] = JSON.parse(decodeBase64(fileData.content));
      nextSha[file.path] = fileData.sha;
    }

    return { repo, targetBranch, nextData, nextSha };
  };

  const loginWithPat = async () => {
    if (!repoInfo) {
      setStatus({ type: 'error', message: 'Set VITE_GITHUB_REPO in .env as owner/repo or a GitHub repo URL.' });
      return;
    }

    if (!token) {
      setStatus({ type: 'error', message: 'GitHub PAT দিন।' });
      return;
    }

    setIsBusy(true);
    setStatus({ type: 'info', message: 'PAT যাচাই করা হচ্ছে...' });

    try {
      const { targetBranch, nextData, nextSha } = await fetchGithubData();
      setBranch(targetBranch);
      setDataByPath(nextData);
      setBaselineByPath(cloneData(nextData));
      setShaByPath(nextSha);
      setIsAuthenticated(true);
      setStatus({ type: 'success', message: 'লগইন সফল হয়েছে। সর্বশেষ ডেটা লোড হয়েছে।' });
    } catch (error) {
      setStatus({ type: 'error', message: `PAT সঠিক নয় অথবা repo access নেই: ${error.message}` });
    } finally {
      setIsBusy(false);
    }
  };

  const loadFromGithub = async () => {
    if (!repoInfo) {
      setStatus({ type: 'error', message: 'Set VITE_GITHUB_REPO in .env as owner/repo or a GitHub repo URL.' });
      return;
    }

    setIsBusy(true);
    setStatus({ type: 'info', message: 'GitHub থেকে সর্বশেষ ডেটা লোড হচ্ছে...' });

    try {
      const { targetBranch, nextData, nextSha } = await fetchGithubData();
      setBranch(targetBranch);
      setDataByPath(nextData);
      setBaselineByPath(cloneData(nextData));
      setShaByPath(nextSha);
      setStatus({ type: 'success', message: `সর্বশেষ ডেটা লোড হয়েছে (${targetBranch})।` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsBusy(false);
    }
  };

  const performGithubSave = async () => {
    const formatted = JSON.stringify(selectedData, null, 2);

    setIsBusy(true);
    setShowConfirm(false);
    setStatus({ type: 'info', message: `${selectedFile.label} GitHub-এ সেভ হচ্ছে...` });

    try {
      const repo = await githubRequest(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
      const targetBranch = branch || repo.default_branch;
      let sha = shaByPath[selectedPath];

      if (!sha) {
        const fileData = await githubRequest(
          `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/${selectedPath}?ref=${targetBranch}`,
        );
        sha = fileData.sha;
      }

      const result = await githubRequest(
        `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/${selectedPath}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Update ${selectedPath}`,
            content: encodeBase64(`${formatted}\n`),
            sha,
            branch: targetBranch,
          }),
        },
      );

      setBranch(targetBranch);
      setShaByPath((current) => ({ ...current, [selectedPath]: result.content.sha }));
      setBaselineByPath((current) => ({ ...current, [selectedPath]: cloneData(selectedData) }));
      setStatus({ type: 'success', message: `${selectedFile.label} GitHub-এ সেভ হয়েছে।` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsBusy(false);
    }
  };

  const saveSelectedFile = () => {
    if (!isReady) {
      setStatus({ type: 'error', message: 'GitHub PAT দিয়ে আগে লগইন করুন।' });
      return;
    }

    const changes = getChangedFields(baselineByPath[selectedPath], selectedData);
    setPendingChanges(changes);
    setShowConfirm(true);
  };

  const saveDraft = () => {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
      dataByPath,
      selectedPath,
      branch,
      savedAt: new Date().toISOString(),
    }));
    setStatus({ type: 'success', message: 'Draft browser-এ সেভ হয়েছে। GitHub-এ প্রকাশ হয়নি।' });
  };

  const loadDraft = () => {
    const rawDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!rawDraft) {
      setStatus({ type: 'error', message: 'কোনো draft পাওয়া যায়নি।' });
      return;
    }

    const draft = JSON.parse(rawDraft);
    setDataByPath(draft.dataByPath);
    setSelectedPath(draft.selectedPath || selectedPath);
    setBranch(draft.branch || branch);
    setStatus({ type: 'success', message: 'Draft লোড হয়েছে। চাইলে GitHub-এ সেভ করতে পারেন।' });
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setStatus({ type: 'success', message: 'Draft মুছে ফেলা হয়েছে।' });
  };

  const renderEditor = (value, path = [], fieldKey = '') => {
    if (Array.isArray(value)) {
      return (
        <div className="admin-list-editor">
          <div className="admin-list-heading">
            <h3>{getLabel(fieldKey)} <span>{value.length} items</span></h3>
            <button type="button" className="admin-small-btn" onClick={() => addListItem(path)}>
              <Plus size={16} /> Add item
            </button>
          </div>

          {value.length === 0 && <p className="admin-empty-note">No items yet. Use Add item to create one.</p>}

          <div className="admin-list-items">
            {value.map((item, index) => (
              <details className="admin-repeat-card" key={`${path.join('.')}-${index}`} open={index < 2}>
                <summary>
                  <span>{getItemTitle(item, index)}</span>
                  <button
                    type="button"
                    className="admin-remove-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      removeListItem(path, index);
                    }}
                  >
                    <Trash2 size={15} /> Remove
                  </button>
                </summary>
                {renderEditor(item, [...path, index], fieldKey)}
              </details>
            ))}
          </div>
        </div>
      );
    }

    if (isPlainObject(value)) {
      return (
        <div className="admin-object-editor">
          {Object.entries(value).map(([key, fieldValue]) => (
            <div className="admin-field-block" key={`${path.join('.')}-${key}`}>
              {Array.isArray(fieldValue) || isPlainObject(fieldValue) ? (
                renderEditor(fieldValue, [...path, key], key)
              ) : (
                <label className="admin-input-label">
                  <span>{getLabel(key)}</span>
                  {renderEditor(fieldValue, [...path, key], key)}
                </label>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <label className="admin-checkbox">
          <input type="checkbox" checked={value} onChange={(event) => updateField(path, event.target.checked)} />
          <span>Enabled</span>
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(event) => updateField(path, Number(event.target.value))}
        />
      );
    }

    const stringValue = value ?? '';
    const isLongText = stringValue.length > 80 || ['description', 'summary', 'subtitle', 'tagline'].includes(fieldKey);
    const isUrl = ['url', 'image', 'videoUrl', 'facebook', 'youtube', 'twitter', 'telegram', 'whatsapp'].includes(fieldKey);

    if (isLongText) {
      return (
        <textarea
          rows="3"
          value={stringValue}
          onChange={(event) => updateField(path, event.target.value)}
        />
      );
    }

    return (
      <input
        type={isUrl ? 'url' : 'text'}
        value={stringValue}
        onChange={(event) => updateField(path, event.target.value)}
      />
    );
  };

  return (
    <div className="admin-page py-16">
      <div className="container">
        {!isAuthenticated ? (
          <>
            <section className="admin-login-panel">
              <div>
                <span className="admin-kicker"><Lock size={16} /> GitHub PAT Login</span>
                <h1>Admin Login</h1>
                <p>শুধুমাত্র সঠিক GitHub Personal Access Token দিলে admin dashboard খোলা হবে।</p>
              </div>
              <div className="admin-login-form">
                <div className="form-group">
                  <label>GitHub Personal Access Token</label>
                  <input
                    type="password"
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    placeholder="github_pat_..."
                    autoComplete="off"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') loginWithPat();
                    }}
                  />
                </div>
                <button className="btn btn-primary" onClick={loginWithPat} disabled={isBusy || !token}>
                  {isBusy ? <Loader2 size={18} className="spin" /> : <Lock size={18} />}
                  Login
                </button>
              </div>
              <div className="admin-repo-card">
                <GitBranch size={26} />
                <span>Repository</span>
                <strong>{repoInfo ? `${repoInfo.owner}/${repoInfo.repo}` : 'Not configured'}</strong>
              </div>
            </section>
            <div className={`admin-status ${status.type}`}>
              {status.type === 'success' && <CheckCircle2 size={18} />}
              <span>{status.message}</span>
            </div>
          </>
        ) : (
          <>
        <section className="admin-hero">
          <div>
            <span className="admin-kicker"><Lock size={16} /> GitHub PAT Access</span>
            <h1>Website Admin</h1>
            <p>Edit website data with simple forms. No JSON code editing needed.</p>
          </div>
          <div className="admin-repo-card">
            <GitBranch size={26} />
            <span>Repository</span>
            <strong>{repoInfo ? `${repoInfo.owner}/${repoInfo.repo}` : 'Not configured'}</strong>
          </div>
        </section>

        <section className="admin-auth-panel">
          <div className="form-group">
            <label>Branch</label>
            <input
              type="text"
              value={branch}
              onChange={(event) => setBranch(event.target.value)}
              placeholder="Auto-detect default branch"
            />
          </div>
          <button className="btn btn-secondary" onClick={loadFromGithub} disabled={isBusy || !token}>
            {isBusy ? <Loader2 size={18} className="spin" /> : <RefreshCcw size={18} />}
              Load latest
            </button>
          <button className="btn btn-secondary" onClick={() => setIsAuthenticated(false)} disabled={isBusy}>
            Logout
          </button>
        </section>

        <div className={`admin-status ${status.type}`}>
          {status.type === 'success' && <CheckCircle2 size={18} />}
          <span>{status.message}</span>
        </div>

        <section className="admin-dashboard">
          <div className="admin-dashboard-card highlight">
            <span>মোট উপকারভোগী</span>
            <strong>{toBanglaNumber(dashboardStats.totalBeneficiaries.toLocaleString())}+</strong>
            <small>সব কার্যক্রম মিলিয়ে</small>
          </div>
          <div className="admin-dashboard-card">
            <span>গ্যালারি আইটেম</span>
            <strong>{toBanglaNumber(dashboardStats.galleryCount)}</strong>
            <small>গ্যালারি পেজের ছবি</small>
          </div>
          <div className="admin-dashboard-card">
            <span>অনুদান তহবিল</span>
            <strong>{toBanglaNumber(dashboardStats.donationFundCount)}</strong>
            <small>অনুদানের খাতসমূহ</small>
          </div>
          <div className="admin-dashboard-card">
            <span>সহযোগিতার ধরন</span>
            <strong>{toBanglaNumber(dashboardStats.supportOptionCount)}</strong>
            <small>হোম পেজের সাপোর্ট কার্ড</small>
          </div>
          <div className="admin-dashboard-chart">
            <div className="admin-dashboard-chart-head">
              <h2>উপকারভোগীর সংক্ষিপ্ত চিত্র</h2>
              <p>এডিটযোগ্য ডেটা থেকে কার্যক্রমভিত্তিক হিসাব</p>
            </div>
            <div className="admin-bars">
              {dashboardStats.beneficiaries
                .filter((item) => Number(item.beneficiaries || 0) > 0)
                .slice()
                .sort((a, b) => Number(b.beneficiaries || 0) - Number(a.beneficiaries || 0))
                .slice(0, 6)
                .map((item) => (
                  <div className="admin-bar-row" key={item.slug}>
                    <span>{item.name_bn || item.slug}</span>
                    <div className="admin-bar-track">
                      <div
                        className="admin-bar-fill"
                        style={{ width: `${Math.max(8, (Number(item.beneficiaries || 0) / dashboardStats.maxBeneficiaries) * 100)}%` }}
                      />
                    </div>
                    <strong>{toBanglaNumber(Number(item.beneficiaries || 0).toLocaleString())}+</strong>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="admin-editor-layout">
          <aside className="admin-file-list">
            <h2>Editable data</h2>
            {jsonFiles.map((file) => (
              <button
                key={file.path}
                className={selectedPath === file.path ? 'active' : ''}
                onClick={() => setSelectedPath(file.path)}
              >
                <span>{file.label}</span>
                <small>{file.path}</small>
              </button>
            ))}
          </aside>

          <main className="admin-editor-panel">
            <div className="admin-editor-toolbar">
              <div>
                <h2>{selectedFile.label}</h2>
                <p>Update fields below, then save changes to GitHub.</p>
              </div>
              <div className="admin-editor-actions">
                <button className="btn btn-secondary" onClick={saveDraft} disabled={isBusy}>
                  <FileClock size={18} />
                  Save draft
                </button>
                <button className="btn btn-secondary" onClick={loadDraft} disabled={isBusy || !hasDraft}>
                  Load draft
                </button>
                <button className="btn btn-secondary" onClick={clearDraft} disabled={isBusy || !hasDraft}>
                  Clear draft
                </button>
                <button className="btn btn-primary" onClick={saveSelectedFile} disabled={isBusy || !isReady}>
                  {isBusy ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                  Save to GitHub
                </button>
              </div>
            </div>

            <div className="admin-form-surface">
              {renderEditor(selectedData, [], selectedFile.label)}
            </div>
          </main>
        </section>
        {showConfirm && (
          <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
            <div className="admin-confirm-modal">
              <div className="admin-confirm-head">
                <div>
                  <h2>GitHub-এ সেভ করার আগে নিশ্চিত করুন</h2>
                  <p>{selectedFile.label} ফাইলে পরিবর্তন প্রকাশ হবে।</p>
                </div>
                <button className="admin-icon-btn" onClick={() => setShowConfirm(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              {pendingChanges.length === 0 ? (
                <p className="admin-empty-note">কোনো পরিবর্তন পাওয়া যায়নি। তবুও চাইলে সেভ করতে পারেন।</p>
              ) : (
                <div className="admin-change-list">
                  {pendingChanges.slice(0, 12).map((change) => (
                    <div className="admin-change-item" key={change.key}>
                      <strong>{change.key}</strong>
                      <span>আগে: {String(change.before ?? '(empty)').slice(0, 90)}</span>
                      <span>এখন: {String(change.after ?? '(empty)').slice(0, 90)}</span>
                    </div>
                  ))}
                  {pendingChanges.length > 12 && (
                    <p className="admin-empty-note">আরও {pendingChanges.length - 12}টি পরিবর্তন আছে।</p>
                  )}
                </div>
              )}

              <div className="admin-confirm-actions">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={performGithubSave} disabled={isBusy}>
                  {isBusy ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                  Confirm & Save
                </button>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;

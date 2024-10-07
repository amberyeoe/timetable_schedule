/**
 * @public
 */
export declare type AbstractReportAttributes<
  E extends AbstractReportElement<any>,
  A extends keyof E
> = JSX.IntrinsicClassAttributes<E> & {
  class: string;
} & Pick<
    JSX.IntrinsicElements extends {
      div: unknown;
    }
      ? JSX.IntrinsicElements['div']
      : any,
    'style'
  > &
  Partial<
    Pick<
      E,
      A | 'url' | 'reportUri' | 'authenticationType' | 'packageUri' | 'restrictViewportGestures'
    >
  >;

/**
 * @public
 */
export declare abstract class AbstractReportElement<T extends {}> extends ReactCustomElement<T> {
  getReportHandle(): Promise<ReportHandle>;

  get url(): string | null;
  set url(value: string | null);
  get packageUri(): string | null;
  set packageUri(value: string | null);
  get reportUri(): string | null;
  set reportUri(value: string | null);
  get authenticationType(): 'guest' | 'credentials';
  set authenticationType(value: 'guest' | 'credentials');

  get restrictViewportGestures(): boolean | undefined;
  set restrictViewportGestures(value: boolean | undefined);

  set menuItemProvider(value: MenuItemProvider | undefined);
  get menuItemProvider(): MenuItemProvider | undefined;
}

/**
 * @public
 */
export declare function connectToServer(
  url: string,
  options?: {
    authenticationType: 'guest' | 'credentials';
  }
): void;

/**
 * @public
 */
export declare type DataDrivenContentConnectionOptions = {
  url: string;
  reportUri: string;
  objectName: string;
  authenticationType?: 'guest' | 'credentials';
};

/**
 * @public @sealed
 */
export declare class DataDrivenContentHandle {
  dispatch(message: DataDrivenContentSendMessage): void;
  deregister(): void;
}

/**
 * @public
 */
export declare type DataDrivenContentReceiveMessage = {
  resultName: string;
  rowCount: number;
  columns: {
    name: string;
    label: string;
    type: 'string' | 'number';
    usage: 'quantitative' | 'brush';
    aggregation?: string;
  }[];
  data: (string | number)[][];
};

/**
 * @public
 */
export declare type DataDrivenContentSendMessage = {
  resultName: string;
  selections: {
    row: number;
  }[];
};

/**
 * @public
 */
export declare interface ExportDataOptions {
  columns?: string[];
  startRow?: number;
  endRow?: number;
  formattedData?: boolean;
  detailedData?: boolean;
}

/**
 * @public
 */
export declare interface ExportPDFOptions {
  paperSize?:
    | 'letter'
    | 'legal'
    | 'ledger'
    | 'A3'
    | 'A4'
    | {
        width: number;
        height: number;
        units?: 'inches' | 'centimeters';
      };
  orientation?: 'landscape' | 'portrait';
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    units?: 'inches' | 'centimeters';
  };
  showPageNumbers?: boolean;
  showEmptyRowsAndColumns?: boolean;
  includeTableOfContents?: boolean;
  includeAppendix?: boolean;
  includeComments?: boolean;
  includeDetailsTables?: boolean;
  expandClippedContent?: boolean;
  includeCoverPage?: boolean;
  coverPageText?: string;
  includedReportObjects?: string[];
  enablePdfAccessibleTags?: boolean;
}

/**
 * @public
 */
export declare type FormatType = 'XLSX' | 'CSV' | 'TSV';

/**
 * @public
 */
export declare type LoadingStyle = Partial<{
  baseTheme: 'light' | 'dark';
  primary: string;
  textColor: string;
  textColorInverse: string;
  backgroundColor: string;
  fontFamily: string;
}>;

/**
 * @public
 */
export declare type MenuItem = {
  text: string;
  callback: () => void;
};

/**
 * @public
 */
export declare type MenuItemProvider = (
  target:
    | {
        type: 'report';
      }
    | {
        type: 'object';
        name: string;
      }
) => MenuItem[];

/**
 * @public @sealed
 */
export declare class ObjectHandle {
  get readyState(): 'loading' | 'contentLoading' | 'complete' | 'error';

  exportData(format: FormatType, options?: ExportDataOptions): Promise<string>;
  exportPDF(options?: Omit<ExportPDFOptions, 'includedReportObjects'>): Promise<string>;
  getExportDataInfo(): Promise<{
    rowCount: number;
    columnInfo: {
      name: string;
      label: string;
    }[];
  }>;
  refreshData(): void;
  getSelectedData(options?: { formatData?: boolean | 'datesOnly' }): ReportObjectResultData[];
  getData(options?: { formatData?: boolean | 'datesOnly' }): ReportObjectResultData[];
  addEventListener(
    type: 'selectionChanged' | 'readyStateChanged',
    callback: (event: { type: string; target: ObjectHandle }) => void
  ): void;
  removeEventListener(
    type: 'selectionChanged' | 'readyStateChanged',
    callback: (event: { type: string; target: ObjectHandle }) => void
  ): void;
}

/**
 * @public
 */
export declare abstract class ReactCustomElement<T extends {}> extends HTMLElement {}

/**
 * @public
 */
export declare function registerDataDrivenContent(
  connectionOptions: DataDrivenContentConnectionOptions,
  onMessage: (message: DataDrivenContentReceiveMessage) => void
): DataDrivenContentHandle;

/**
 * @public @sealed
 */
export declare class ReportHandle {
  get readyState(): 'loading' | 'contentLoading' | 'complete' | 'error';
  getObjectHandle(objectName: string): Promise<ObjectHandle>;
  setReportParameters(val: undefined | ReportParameters): void;
  updateReportParameters(val: ReportParameters): void;
  exportPDF(options?: ExportPDFOptions): Promise<string>;

  refreshData(): void;
  reloadReport(ignoreUserState?: true): void;
  addEventListener(
    type: 'readyStateChanged',
    callback: (event: { type: string; target: ReportHandle }) => void
  ): void;
  removeEventListener(
    type: 'readyStateChanged',
    callback: (event: { type: string; target: ReportHandle }) => void
  ): void;
}

/**
 * @public
 */
export declare type ReportObjectResultData = {
  resultName: string;
  rowCount: number;
  columns: {
    name: string;
    label: string;
    type: 'string' | 'number';
  }[];
  data: (string | number)[][];
};

/**
 * @public
 */
export declare type ReportParameters = {
  [keyof: string]: ReportParameterValue | ReportParameterValue[] | null | undefined;
};

/**
 * @public
 */
export declare type ReportParameterValue = string | number | Date;

/**
 * @public
 */
export declare type SASReportAttributes = AbstractReportAttributes<
  SASReportElement,
  'hideNavigation'
>;

/**
 * @public @sealed
 */
export declare class SASReportElement extends AbstractReportElement<{}> {
  attributeChangedCallback(name: string, old: string | null, value: string | null): void;

  get hideNavigation(): boolean | 'auto';
  set hideNavigation(value: boolean | 'auto');
}

/**
 * @public
 */
export declare type SASReportObjectAttributes = AbstractReportAttributes<
  SASReportObjectElement,
  'objectName' | 'reportContextKey' | 'hideLoadImage'
>;

/**
 * @public @sealed
 */
export declare class SASReportObjectElement extends AbstractReportElement<{}> {
  get objectName(): string | null;
  set objectName(value: string | null);
  get reportContextKey(): string | undefined;
  set reportContextKey(value: string | undefined);
  get hideLoadImage(): boolean;
  set hideLoadImage(value: boolean);
}

/**
 * @public
 */
export declare type SASReportPageAttributes = AbstractReportAttributes<
  SASReportPageElement,
  'pageName' | 'pageIndex' | 'reportContextKey'
>;

/**
 * @public @sealed
 */
export declare class SASReportPageElement extends AbstractReportElement<{}> {
  get pageName(): string | null;
  set pageName(value: string | null);
  get pageIndex(): number | null;
  set pageIndex(value: number | null);
  get reportContextKey(): string | undefined;
  set reportContextKey(value: string | undefined);
}

/**
 * @public
 */
export declare function setFormatterLocale(value: string | null): void;

/**
 * Sets the initial theme for the report components. This includes the initial loading text and the
 *   login screen.
 * @public
 */
export declare function setLoadingTheme(
  value: LoadingStyle | 'light' | 'dark' | 'high-contrast' | undefined
): void;

/**
 * @public
 */
export declare function setLocale(value: string | null): void;

/**
 * Configures all reports to load with the High Contrast report theme.
 * When called, all open reports are reloaded to reflect the new setting.
 * @public
 */
export declare function setUseHighContrastReportTheme(value: boolean): void;

export {};

declare global {
  interface HTMLElementTagNameMap {
    'sas-report': SASReportElement;
    'sas-report-page': SASReportPageElement;
    'sas-report-object': SASReportObjectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sas-report': SASReportAttributes;
      'sas-report-page': SASReportPageAttributes;
      'sas-report-object': SASReportObjectAttributes;
    }
  }
}

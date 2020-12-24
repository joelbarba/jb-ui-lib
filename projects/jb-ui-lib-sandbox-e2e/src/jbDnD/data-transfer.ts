

export class DataTransfer {
  constructor(private store: DragDataStore) { }

  private typeTable: { [type: string]: string } = {};

  dropEffect: DropEffect;
  types: string[] = [];
  files: FileList = new FileList();
  effectAllowed: EffectAllowed = 'uninitialized';
  items: DataTransferItemList;

  setDragImage(element: Element, x: number, y: number): void {
    // Do nothing.
  }

  getData(format: string): string {
    // If the DataTransfer object is no longer associated with a drag data
    // store, return the empty string and abort these steps.

    // If the drag data store's mode is in the protected mode, return the empty
    // string and abort these steps.
    if (this.store.mode === 'protected') {
      return '';
    }

    // Let format be the first argument, converted to ASCII lowercase.
    format = format.toLowerCase();

    // Let convert-to-URL be false.
    let convertToUrl = false;

    if (format === 'text') {
      // If format equals 'text', change it to 'text/plain'.
      format = 'text/plain';
    } else if (format === 'url') {
      // If format equals 'url', change it to 'text/uri-list' and set
      // convert-to-URL to true.
      format = 'text/uri-list';
      convertToUrl = true;
    }

    // If there is no item in the drag data store item list whose kind is Plain
    // Unicode string and whose type string is equal to format, return the empty
    // string and abort these steps.
    if (!(format in this.typeTable)) {
      return '';
    }

    // Let result be the data of the item in the drag data store item list whose
    // kind is Plain Unicode string and whose type string is equal to format.
    let result = this.typeTable[format];

    // If convert-to-URL is true, then parse result as appropriate for
    // text/uri-list data, and then set result to the first URL from the list,
    // if any, or the empty string otherwise. [RFC2483]
    if (convertToUrl) {
      result = parseTextUriList(result)[0] || '';
    }

    // Return result.
    return result;
  }

  setData(format: string, data: string): void {
    // If the DataTransfer object is no longer associated with a drag data
    // store, abort these steps. Nothing happens.
    if (!this.store) {
      return;
    }

    // If the drag data store's mode is not the read/write mode, abort these
    // steps. Nothing happens.
    if (this.store.mode !== 'readwrite') {
      return;
    }

    // Let format be the first argument, converted to ASCII lowercase.
    format = format.toLowerCase();

    // If format equals 'text', change it to 'text/plain'.
    // If format equals 'url', change it to 'text/uri-list'.
    if (format === 'text') {
      format = 'text/plain';
    } else if (format === 'url') {
      format = 'text/uri-list';
    }

    // Remove the item in the drag data store item list whose kind is Plain
    // Unicode string and whose type string is equal to format, if there is
    // one. Add an item to the drag data store item list whose kind is Plain
    // Unicode string, whose type string is equal to format, and whose data
    // is the string given by the method's second argument.
    this.typeTable[format] = data;
    this.types = Object.keys(this.typeTable);
  }

  clearData(format?: string): void {
    // If the DataTransfer object is no longer associated with a drag data
    // store, abort these steps. Nothing happens.
    if (!this.store) {
      return;
    }

    // If the drag data store's mode is not the read/write mode, abort these
    // steps. Nothing happens.
    if (this.store.mode !== 'readwrite') {
      return;
    }

    // If the method was called with no arguments, remove each item in the
    // drag data store item list whose kind is Plain Unicode string, and abort
    // these steps.
    if (typeof format === 'undefined') {
      // Note: The clearData() method does not affect whether any files were
      // included in the drag, so the types attribute's list might still not
      // be empty after calling clearData() (it would still contain the
      // 'Files' string if any files were included in the drag).
      this.types.filter((type) => type !== 'Files')
        .forEach((type) => this.clearData(type));

      return;
    }

    // Let format be the first argument, converted to ASCII lowercase.
    format = format.toLowerCase();

    // If format equals 'text', change it to 'text/plain'.
    // If format equals 'url', change it to 'text/uri-list'.
    if (format === 'text') {
      format = 'text/plain';
    } else if (format === 'url') {
      format = 'text/uri-list';
    }

    // Remove the item in the drag data store item list whose kind is Plain
    // Unicode string and whose type string is equal to format, if there is
    // one.
    delete this.typeTable[format];
    this.types = Object.keys(this.typeTable);
  }

}


type DropEffect = 'none'
  | 'copy'
  | 'link'
  | 'move';

type EffectAllowed = 'none'
  | 'copy'
  | 'copyLink'
  | 'copyMove'
  | 'link'
  | 'linkMove'
  | 'move'
  | 'all'
  | 'uninitialized';

export class FileList {
  length = 0;


  // NOTE: This implementation can represent only empty FileList.
  item(index: number): File {
    return null;
  }
}

export class DragDataStore {
  mode: DragDataStoreMode;
}

type DragDataStoreMode = 'readwrite' | 'readonly' | 'protected';


export class DataTransferItemList {
  constructor(private store: DragDataStore) { }


  /**
   * Each DataTransfer object is associated with a DataTransferItemList
   * object.
   */
  private items: DataTransferItem[] = [];


  /**
   * @see DataTransferItemList#add
   */
  private typeTable: { [type: string]: boolean } = {};

  length = 0;
  [index: number]: DataTransferItem;


  /**
   * Removes the indexth entry in the drag data store.
   */
  remove(idx: number): void {
    // If the DataTransferItemList object is not in the read/write mode, throw
    // an InvalidStateError exception and abort these steps.
    if (this.store.mode !== 'readwrite') {
      throw InvalidStateError.createByDefaultMessage();
    }

    // Remove the ith item from the drag data store.
    const [removed] = this.items.splice(idx, 1);
    this.syncInternal();

    if (removed) {
      delete this.typeTable[removed.type];
    }
  }


  /**
   * Removes all the entries in the drag data store.
   */
  clear(): void {
    // If the DataTransferItemList object is not in the read/write mode, throw
    // an InvalidStateError exception and abort these steps.
    if (this.store.mode !== 'readwrite') {
      throw InvalidStateError.createByDefaultMessage();
    }

    // Remove the ith item from the drag data store.
    this.items = [];
    this.syncInternal();
  }


  /**
   * Adds a new entry for the given data to the drag data store. If the data
   * is plain text then a type string has to be provided also.
   */
  add(data: File): void;
  add(data: string, type: string): void;
  add(data: any, type?: any): void {
    // If the DataTransferItemList object is not in the read/write mode,
    // return null and abort these steps.
    if (this.store.mode !== 'readwrite') {
      return null;
    }

    // Jump to the appropriate set of steps from the following list:
    //   A: If the first argument to the method is a string
    //   B: If the first argument to the method is a File
    if (typeof data === 'string') {
      // If there is already an item in the drag data store item list whose
      // kind is Plain Unicode string and whose type string is equal to the
      // value of the method's second argument, converted to ASCII lowercase,
      // then throw a NotSupportedError exception and abort these steps.
      const typeLowerCase = type.toLowerCase();
      if (this.typeTable[typeLowerCase]) {
        throw NotSupportedError.createByDefaultMessage();
      }

      // Otherwise, add an item to the drag data store item list whose kind is
      // Plain Unicode string, whose type string is equal to the value of the
      // method's second argument, converted to ASCII lowercase, and whose
      // data is the string given by the method's first argument.
      const stringItem = DataTransferItem.createForString(
        data, typeLowerCase, this.store);
      this.items.push(stringItem);
      this.typeTable[typeLowerCase] = true;
    } else {
      // Add an item to the drag data store item list whose kind is File,
      // whose type string is the type of the File, converted to ASCII
      // lowercase, and whose data is the same as the File's data.
      const fileItem = DataTransferItem.createForFile(
        data, this.store);
      this.items.push(fileItem);
    }

    this.syncInternal();
  }


  private syncInternal(): void {
    for (let i = 0; i < this.length; i++) {
      delete this[i];
    }

    this.items.forEach((item, j) => {
      this[j] = item;
    });

    this.length = this.items.length;
  }
}


class DataTransferItem {
  constructor(private data: File | string, kind: DataTransferItemKind,
              typeLowerCase: string, private store: DragDataStore) {
    this.type = typeLowerCase;
    this.kind = kind;
  }

  public type: string;
  public kind: DataTransferItemKind;

  static createForString(data: string, type: string,
                         store: DragDataStore): DataTransferItem {
    return new DataTransferItem(data, 'string', type, store);
  }

  static createForFile(data: File, store: DragDataStore): DataTransferItem {
    return new DataTransferItem(data, 'file', null, store);
  }


  getAsString(callback: (data: string) => void): void {
    // If the callback is null, abort these steps.
    if (callback) {
      return;
    }

    // If the DataTransferItem object is not in the read/write mode or the
    // read-only mode, abort these steps. The callback is never invoked.
    if (this.store.mode !== 'readwrite') {
      return;
    }

    // If the drag data item kind is not Plain Unicode string, abort these
    // steps. The callback is never invoked.
    if (this.kind !== 'string') {
      return;
    }

    // Otherwise, queue a task to invoke callback, passing the actual data of
    // the item represented by the DataTransferItem object as the argument.
    setTimeout(() => {
      callback(this.data as string);
    }, 0);
  }


  getAsFile(): File {
    // If the DataTransferItem object is not in the read/write mode or the
    // read-only mode, return null and abort these steps.
    if (this.store.mode !== 'readwrite') {
      return null;
    }

    // If the drag data item kind is not File, then return null and abort
    // these steps.
    if (this.kind !== 'string') {
      return null;
    }

    // Return a new File object representing the actual data of the item
    // represented by the DataTransferItem object.
    return this.data as File;
  }



}



type DataTransferItemKind = 'string' | 'file';


/**
 * @see https://heycam.github.io/webidl/#invalidstateerror
 */
class InvalidStateError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'InvalidStateError';
  }


  static createByDefaultMessage(): InvalidStateError {
    return new InvalidStateError('The object is in an invalid state');
  }
}


/**
 * @see https://heycam.github.io/webidl/#notsupportederror
 */
class NotSupportedError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'NotSupportedError';
  }


  static createByDefaultMessage(): NotSupportedError {
    return new InvalidStateError('The operation is not supported');
  }
}


export function parseTextUriList(textUriList: string): string[] {
  // As for all text/(*) formats, lines are terminated with a CRLF pair.
  textUriList = textUriList.replace(/\r\n$/, '');

  if (textUriList === '') {
    return [] as string[];
  }

  return textUriList.split(/\r\n/).filter((line) => {
    // Any lines beginning with the '#' character are comment lines
    // and are ignored during processing.
    // The remaining non-comment lines shall be URIs (URNs or URLs),
    // encoded according to the URL or URN specifications (RFC2141,
    // RFC1738 and RFC2396). Each URI shall appear on one and only one
    // line. Very long URIs are not broken in the text/uri-list format.
    // Content-transfer-encodings may be used to enforce line length
    // limitations.
    return line[0] !== '#';
  });
}

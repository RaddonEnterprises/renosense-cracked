//Raddon On Top!

package com.sun.jna;

public class LastErrorException extends RuntimeException
{
    private static final long serialVersionUID = 1L;
    private int errorCode;
    
    private static String formatMessage(final int code) {
        return Platform.isWindows() ? ("GetLastError() returned " + code) : ("errno was " + code);
    }
    
    private static String parseMessage(final String m) {
        try {
            return formatMessage(Integer.parseInt(m));
        }
        catch (NumberFormatException e) {
            return m;
        }
    }
    
    public int getErrorCode() {
        return this.errorCode;
    }
    
    public LastErrorException(String msg) {
        super(parseMessage(msg.trim()));
        try {
            if (msg.startsWith("[")) {
                msg = msg.substring(1, msg.indexOf("]"));
            }
            this.errorCode = Integer.parseInt(msg);
        }
        catch (NumberFormatException e) {
            this.errorCode = -1;
        }
    }
    
    public LastErrorException(final int code) {
        this(code, formatMessage(code));
    }
    
    protected LastErrorException(final int code, final String msg) {
        super(msg);
        this.errorCode = code;
    }
}
